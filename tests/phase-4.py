"""Cultural journeys and local-only storage. Run against the local Vite server."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright, expect

BASE='http://127.0.0.1:5173/'
KEY='vivase:memories:v1'
OUT=Path('tmp/phase-4');OUT.mkdir(exist_ok=True)
checks=[]
def mock_map(route):
    if '.svg' in route.request.url:
        route.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg"/>')
    else:
        route.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]}))
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
    context=browser.new_context(viewport={'width':1440,'height':1000},locale='pt-BR')
    context.route('https://api.maptiler.com/**',mock_map)
    page=context.new_page();errors=[];requests=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('request',lambda r:requests.append(r.url+(r.post_data or '')))
    page.goto(BASE+'#/roteiros?dia=21&roteiro=artes')
    expect(page.locator('.route-choice')).to_have_count(3)
    expect(page.locator('.cultural-stops>li')).to_have_count(3)
    expect(page.locator('h1')).to_be_focused()
    page.get_by_role('link',name='Ver espaço no mapa').first.click()
    expect(page.get_by_role('heading',name='Escola e Galeria de Artes Vesta Viana')).to_be_visible()
    expect(page.locator('.place-photo img')).to_be_visible()
    assert page.locator('.place-photo img').evaluate('(i)=>i.complete && i.naturalWidth>0')
    page.get_by_role('button',name='Voltar à cultura').click()
    expect(page.locator('.route-choice[aria-current]')).to_contain_text('Arte por outros caminhos')
    assert 'roteiro=artes' in page.url and 'dia=21' in page.url
    checks.append('Roteiro → detalhe com foto → retorno preserva dia e roteiro')

    page.goto(BASE+'#/historia?dia=21')
    expect(page.locator('.history-list>li')).to_have_count(14)
    expect(page.locator('.history-year').first).to_contain_text('2005')
    expect(page.locator('.history-list')).not_to_contain_text('1972')
    page.get_by_role('button',name='Cidade',exact=True).click()
    expect(page.locator('.history-list>li')).to_have_count(1)
    expect(page.locator('.history-year')).to_have_text('2010')
    page.get_by_role('button',name='Festival',exact=True).click()
    expect(page.locator('.history-list>li')).to_have_count(13)
    expect(page.locator('.history-list')).to_contain_text('edição anunciada')
    checks.append('Marcos documentados: cidade separada do festival e 2026 anunciada')

    page.goto(BASE+'#/memorias?dia=21&espaco=culturas')
    expect(page.locator('.is-published')).to_have_count(2)
    expect(page.locator('.is-example')).to_contain_text('Exemplo fictício')
    expect(page.get_by_role('combobox',name='Espaço da lembrança (opcional)')).to_contain_text('Casa das Culturas')
    private_text='MEMORIA_PRIVADA_QA_7249 <img src=x onerror="window.injected=true">'
    page.get_by_role('textbox',name='Seu nome ou apelido').fill('Visitante QA')
    page.get_by_role('textbox',name='Sua lembrança').fill(private_text)
    page.get_by_role('button',name='Salvar no meu aparelho').click()
    expect(page.locator('.save-feedback')).to_contain_text('salva somente neste navegador')
    page.reload();expect(page.locator('.is-personal')).to_contain_text(private_text)
    expect(page.locator('.is-personal img')).to_have_count(0)
    assert page.evaluate('window.injected') is None
    assert all('MEMORIA_PRIVADA_QA_7249' not in r for r in requests)
    raw=page.evaluate('(key)=>localStorage.getItem(key)',KEY)
    assert 'coordinates' not in raw and json.loads(raw)['memories'][0]['placeId']=='culturas'
    page.get_by_role('button',name='Excluir lembrança de Visitante QA').click()
    page.get_by_role('button',name='Cancelar',exact=True).click()
    expect(page.locator('.is-personal')).to_have_count(1)
    page.get_by_role('button',name='Excluir lembrança de Visitante QA').click()
    page.get_by_role('button',name='Confirmar exclusão').click()
    page.reload();expect(page.locator('.is-personal')).to_have_count(0)
    checks.append('Salvar/recarregar/cancelar exclusão/excluir; texto literal e sem envio HTTP')

    page.evaluate('(key)=>localStorage.setItem(key,"{quebrado")',KEY);page.reload()
    expect(page.locator('.local-memories [role=alert]')).to_be_visible()
    page.get_by_role('textbox',name='Sua lembrança').fill('Não perder este texto')
    page.get_by_role('button',name='Salvar no meu aparelho').click()
    expect(page.get_by_role('textbox',name='Sua lembrança')).to_have_value('Não perder este texto')
    assert page.evaluate('(key)=>localStorage.getItem(key)',KEY)=='{quebrado'
    page.evaluate('(key)=>localStorage.removeItem(key)',KEY);page.reload()
    page.evaluate('()=>{Storage.prototype.setItem=function(){throw new DOMException("full","QuotaExceededError")}}')
    page.get_by_role('textbox',name='Sua lembrança').fill('Preservada quando não há espaço')
    page.get_by_role('button',name='Salvar no meu aparelho').click()
    expect(page.locator('form [role=alert]')).to_contain_text('bloqueado ou cheio')
    expect(page.get_by_role('textbox',name='Sua lembrança')).to_have_value('Preservada quando não há espaço')
    expect(page.locator('.is-personal')).to_have_count(0)
    checks.append('Dados corrompidos e quota não sobrescrevem nem alegam salvamento')

    blocked=browser.new_context()
    blocked.add_init_script('Object.defineProperty(window,"localStorage",{get(){throw new DOMException("blocked","SecurityError")}})')
    blocked_page=blocked.new_page();blocked_page.goto(BASE+'#/memorias')
    expect(blocked_page.locator('.local-memories [role=alert]')).to_contain_text('não está disponível')
    blocked.close();checks.append('Acesso ao próprio localStorage bloqueado não quebra a tela')

    page.route('**/images/places/culturas.jpg',lambda r:r.abort())
    page.goto(BASE+'#/mapa?dia=21&lugar=culturas')
    expect(page.locator('.place-photo-fallback')).to_contain_text('A foto não carregou')
    expect(page.get_by_role('link',name='Abrir fonte da foto')).to_be_visible()
    page.unroute('**/images/places/culturas.jpg')
    page.goto(BASE+'#/mapa?dia=21')
    page.get_by_role('button',name='Abrir Palco João Bebe Água',exact=True).click()
    if page.locator('.nearby-picker').is_visible():page.locator('.nearby-picker').get_by_role('button',name='Palco João Bebe Água',exact=True).click()
    expect(page.locator('.map-selection .place-photo img')).to_be_visible()
    expect(page.locator('.map-selection figcaption')).to_contain_text('FASC 2025')
    page.get_by_role('button',name='Ver detalhes',exact=True).scroll_into_view_if_needed()
    expect(page.get_by_role('button',name='Ver detalhes',exact=True)).to_be_visible()
    page.screenshot(path=str(OUT/'mapa-foto-1440.png'))
    page.goto(BASE+'#/mapa?dia=21&lugar=tsuru')
    expect(page.locator('.place-photo img')).to_be_visible()
    expect(page.locator('.place-photo figcaption a')).to_have_attribute('href','https://maps.app.goo.gl/t9KkQw44G2eNcTMA9')
    checks.append('Foto com fallback e referências de fachada corretas')

    axe=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8')
    for width,height in [(1440,1000),(768,1024),(390,844),(320,800)]:
        page.set_viewport_size({'width':width,'height':height})
        for name in ['roteiros','memorias','historia']:
            page.goto(BASE+'#/'+name+'?dia=21');page.wait_for_load_state('networkidle')
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(width,name)
            if width in [1440,390]:page.screenshot(path=str(OUT/f'{name}-{width}.png'),full_page=True)
            if width==390:
                page.add_script_tag(content=axe)
                result=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})')
                assert not result['violations'],[(v['id'],v['description']) for v in result['violations']]
    checks.append('Reflow 1440/768/390/320 e axe nas três telas em 390px')
    assert not errors,errors
    (OUT/'checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8')
    print(json.dumps(checks,ensure_ascii=False,indent=2))
    browser.close()

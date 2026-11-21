"""Phase 3 acceptance: real browser UI, mocked cartography and device failures."""
import json
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright,expect
BASE='http://127.0.0.1:5173/'
out=Path('tmp/phase-3-qa');out.mkdir(parents=True,exist_ok=True)
checks=[];errors=[];accessibility=[]
def reveal_filters(page):
    panel=page.locator("details.filter-disclosure").first
    panel.wait_for(state="visible")
    if panel.get_attribute("open") is None:
        panel.locator("summary").click()

def mock_map(route):
    if '.svg' in route.request.url:
        route.fulfill(status=200,content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg" width="82" height="24"/>')
    else:
        route.fulfill(status=200,content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[{'id':'background','type':'background','paint':{'background-color':'#e9eee3'}}]}))
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
    def context(**options):
        c=browser.new_context(locale='pt-BR',**options);c.route('https://api.maptiler.com/**',mock_map)
        c.on('page',lambda page:page.on('pageerror',lambda e:errors.append(str(e))))
        return c
    c=context(viewport={'width':1440,'height':1000});page=c.new_page()
    page.goto(BASE+'#/fasc');page.locator('.hero-action').wait_for();page.keyboard.press('Tab')
    expect(page.get_by_role('link',name='Pular para o conteúdo')).to_be_focused()
    page.keyboard.press('Enter');expect(page.locator('#conteudo')).to_be_focused()
    page.locator('.hero-action').click()
    expect(page.locator('main h1')).to_be_focused()
    search=page.get_by_role('textbox',name='Buscar espaço ou atração')
    reveal_filters(page)
    search.fill('PERICLES');page.get_by_role('button',name='Filtrar Música',exact=True).click()
    expect(page.locator('.place-row')).to_have_count(1)
    search.focus()
    for _ in range(10):
        page.keyboard.press('Tab')
        if page.locator('.place-row').evaluate('(el)=>el===document.activeElement'):break
    expect(page.locator('.place-row')).to_be_focused();page.keyboard.press('Enter')
    expect(page.locator('.place-detail h2')).to_be_focused()
    expect(page.get_by_role('button',name='Domingo, 22 de novembro')).to_have_attribute('aria-pressed','true')
    expect(page.get_by_text('Péricles',exact=True)).to_be_visible()
    page.get_by_role('button',name='Todos os espaços',exact=True).click()
    expect(search).to_have_value('PERICLES');expect(page.locator('.place-row')).to_be_focused()
    page.reload();expect(search).to_have_value('PERICLES')
    reveal_filters(page)
    expect(page.get_by_role('button',name='Filtrar Música',exact=True)).to_have_attribute('aria-pressed','true')
    page.locator('.place-row').click();page.go_back()
    expect(search).to_have_value('PERICLES');page.go_forward()
    expect(page.locator('.place-detail h2')).to_be_visible()
    checks.append('T01/T03/T05: teclado, foco, filtros em URL, reload e histórico do mapa')
    page.goto(BASE+'#/programacao?dia=20&espaco=cinema&busca=sess')
    expect(page.locator('.schedule-list>li').first).to_be_visible()
    agenda_url=page.url;agenda_count=page.locator('.schedule-list>li').count()
    page.locator('.schedule-list .event-space-action').first.click()
    expect(page.locator('.place-detail h2')).to_be_focused()
    page.get_by_role('button',name='Sábado, 21 de novembro').click()
    page.get_by_role('button',name='Voltar à programação').click()
    expect(page).to_have_url(agenda_url)
    expect(page.get_by_role('textbox',name='Buscar na programação')).to_have_value('sess')
    reveal_filters(page)
    expect(page.get_by_role('combobox',name='Espaço da programação')).to_contain_text('Cine Trianon')
    expect(page.locator('.schedule-list>li')).to_have_count(agenda_count)
    checks.append('T06: agenda filtrada → espaço → troca de dia → retorno à consulta original')
    page.goto(BASE+'#/mapa?dia=20&lugar=tsuru')
    route=page.get_by_role('link',name='Como chegar');params=parse_qs(urlparse(route.get_attribute('href')).query)
    assert params['travelmode']==['walking'] and '84' in params['destination'][0]
    assert route.get_attribute('target')=='_blank'
    page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedAddress=text;}}})")
    page.get_by_role('button',name='Copiar endereço').click()
    expect(page.get_by_text('Endereço copiado.',exact=True)).to_be_visible()
    assert '84' in page.evaluate('window.copiedAddress')
    page.evaluate("()=>{navigator.clipboard.writeText=async()=>{throw new Error('blocked')}}")
    page.get_by_role('button',name='Copiar endereço').click()
    expect(page.get_by_text('Não foi possível copiar. Você pode selecionar o endereço acima.')).to_be_visible()
    checks.append('T10: destino externo, cópia bem-sucedida e falha recuperável')
    page.goto(BASE+'#/mapa?dia=21&lugar=inexistente%22')
    expect(page.get_by_text('Espaço não encontrado. Escolha um lugar na lista.')).to_be_visible()
    expect(page.locator('.place-row')).to_have_count(20)
    page.locator('.place-row').first.click();page.get_by_role('button',name='Todos os espaços',exact=True).click()
    checks.append('Acesso direto inválido não quebra exploração')
    for code,message in [(2,'Não foi possível obter sua posição. Você pode usar a lista.'),(3,'O aparelho demorou para responder. Tente novamente ou use a lista.')]:
        page.goto(BASE+'#/mapa')
        page.evaluate('(code)=>Object.defineProperty(navigator,"geolocation",{configurable:true,value:{getCurrentPosition:(_,error)=>error({code})}})',code)
        page.get_by_role('button',name='Minha localização').click()
        expect(page.get_by_text(message,exact=True)).to_be_visible()
        expect(page.locator('.place-row')).to_have_count(20)
        expect(page.get_by_role('button',name='Minha localização')).to_be_enabled()
    page.evaluate("Object.defineProperty(navigator,'geolocation',{configurable:true,value:undefined})")
    page.get_by_role('button',name='Minha localização').click()
    expect(page.get_by_text('Este navegador não disponibiliza localização. Continue pela lista.')).to_be_visible()
    page.evaluate("Object.defineProperty(navigator,'geolocation',{configurable:true,value:{getCurrentPosition:()=>{throw new Error('security')}}})")
    page.get_by_role('button',name='Minha localização').click()
    expect(page.get_by_text('Não foi possível obter sua posição. Você pode usar a lista.')).to_be_visible()
    checks.append('T09: GPS indisponível, timeout, API ausente e exceção síncrona')
    page.evaluate("Object.defineProperty(navigator,'geolocation',{configurable:true,value:{getCurrentPosition:success=>{window.lateLocation=success;}}})")
    page.get_by_role('button',name='Minha localização').click()
    page.get_by_role('link',name='Programação',exact=True).click()
    expect(page.get_by_role('heading',name='Viva cada encontro.',exact=True)).to_be_visible()
    page.evaluate('window.lateLocation({coords:{latitude:-11.014,longitude:-37.205,accuracy:30}})')
    expect(page.get_by_role('heading',name='Viva cada encontro.',exact=True)).to_be_visible()
    assert '/programacao?' in page.url
    checks.append('Resposta tardia de GPS não interrompe outra tela')
    page.goto(BASE+'#/mapa')
    page.evaluate("Object.defineProperty(navigator,'geolocation',{configurable:true,value:{getCurrentPosition:success=>success({coords:{latitude:-11.014,longitude:-37.205,accuracy:35}})}})")
    page.get_by_role('button',name='Minha localização').click()
    expect(page.get_by_text('Localização aproximada recebida (precisão de 35 m).')).to_be_visible()
    expect(page.locator('.user-position')).to_be_visible()
    assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
    page.reload();expect(page.locator('.user-position')).to_have_count(0)
    checks.append('T08: posição aproximada em sessão, sem persistência ou restauração após reload')
    # Textual content survives a missing festival image.
    page.route('**/images/fasc-2025-palco-julia-rodrigues.jpg',lambda route:route.abort())
    page.goto(BASE+'#/fasc');expect(page.locator('.hero-action')).to_be_visible()
    checks.append('T19: imagem indisponível preserva ação e texto da entrada')
    # A 640 CSS-pixel layout is the reflow width of a 1280px desktop at 200% zoom.
    # This is explicit simulation, not a claim of native browser zoom or physical hardware.
    for width in [1440,768,640,390,360]:
        page.set_viewport_size({'width':width,'height':900})
        for path in ['#/fasc', '#/mapa?dia=20', '#/mapa?dia=22&lugar=joao', '#/programacao?dia=21&espaco=cinema', '#/sobre']:
            page.goto(BASE+path);page.wait_for_load_state('networkidle')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,path)
        if width==640:
            page.goto(BASE+'#/mapa?dia=22&lugar=joao');page.screenshot(path=str(out/'reflow-200-equivalent.png'),full_page=True)
    checks.append('T18: reflow em 360/390/640/768/1440px; 640px equivale à largura de 1280px a 200%')
    page.set_viewport_size({'width':1440,'height':1000})
    for label,path in [('entrada',''),('lista','#/mapa'),('detalhe','#/mapa?dia=22&lugar=joao'),('agenda','#/programacao?dia=21&espaco=cinema'),('sobre','#/sobre')]:
        page.goto(BASE+path);page.wait_for_load_state('networkidle')
        page.add_script_tag(path='node_modules/axe-core/axe.min.js')
        result=page.evaluate("async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}}")
        accessibility.append({'screen':label,**result})
    (out/'accessibility.json').write_text(json.dumps(accessibility,ensure_ascii=False,indent=2),encoding='utf-8')
    assert not errors,errors
    result={'checks':checks,'pageErrors':errors,'accessibility':accessibility,'browser':browser.version,'cartography':'mocked','physicalDevice':'separate user-reported check'}
    (out/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2))
    assert all(not r['violations'] for r in accessibility),'Revisar violações axe registradas no relatório.'
    c.close();browser.close()

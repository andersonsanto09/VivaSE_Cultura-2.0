"""Archive expansion: timeline above maps, curated artists, chronology, popup and photos."""
from pathlib import Path
import json,subprocess
from datetime import datetime,timezone
from playwright.sync_api import sync_playwright,expect
BASE='http://127.0.0.1:5173/'
OUT=Path('tmp/history');OUT.mkdir(exist_ok=True)
checks=[]
snapshot=json.loads(subprocess.check_output(['node','--experimental-strip-types','--input-type=module','-e',"import * as h from './src/data/history.ts';console.log(JSON.stringify({editions:h.festivalEditions.map(e=>({id:e.id,pins:h.historicalVenues.filter(v=>v.editionId===e.id&&v.coordinates).length})),artists:h.historicalArtists.filter(a=>a.featured).length}));"],text=True,encoding='utf8'))
def mock_map(r):
    if '.svg' in r.request.url:r.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg"/>')
    else:r.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]}))
with sync_playwright() as p:
    b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
    c=b.new_context(viewport={'width':1440,'height':1000},locale='pt-BR');c.route('https://api.maptiler.com/**',mock_map)
    page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    def visit(path,selector):
        page.goto(BASE+'#/'+path);page.locator(selector).first.wait_for(state='visible');page.wait_for_load_state('networkidle')
    def year(value):
        page.get_by_role('button',name='2026 · programação atual' if value==2026 else f'Edição de {value}',exact=True).click()
        expect(page.locator('.time-machine-years button[aria-pressed=true]')).to_contain_text(str(value))
    visit('mapa?dia=21&busca=pericles&categoria=M%C3%BAsica','.time-machine')
    assert page.locator('.time-machine').bounding_box()['y']<page.locator('.workspace').bounding_box()['y']
    year(2025);year(2026)
    expect(page.get_by_role('textbox',name='Buscar espaço ou atração')).to_have_value('pericles')
    assert 'dia=21' in page.url and 'categoria=' in page.url
    checks.append('Máquina do tempo visível acima do mapa; ida/volta preserva filtros atuais')
    visit('mapa?modo=historico','.time-machine')
    expect(page.locator('.time-machine-years button[aria-pressed=true]')).to_contain_text('2025')
    for e in snapshot['editions']:
        year(int(e['id']));expect(page.locator('.festival-pin')).to_have_count(e['pins'])
        assert 'undefined' not in page.locator('.historical-cartography').inner_text()
        assert page.locator('.time-machine').bounding_box()['y']<page.locator('.historical-workspace').bounding_box()['y']
    year(2018)
    page.get_by_role('button',name='Palco Antônio Mariano',exact=False).click()
    expect(page.locator('#historical-venue-title')).to_have_text('Palco Antônio Mariano')
    expect(page.locator('.historical-venue-detail')).to_contain_text('Praça da Bíblia')
    expect(page.locator('.historical-venue-detail')).to_contain_text('Localização indisponível')
    checks.append('18 edições com configurações próprias; local incerto permanece sem pin')
    year(2022);page.get_by_role('button',name='Abrir Palco Gal Costa',exact=True).click()
    expect(page.locator('#historical-venue-title')).to_have_text('Palco Gal Costa')
    expect(page.locator('.historical-venue-detail')).to_contain_text('The Baggios')
    expect(page.locator('.historical-venue-detail')).to_contain_text('01h00 (anunciado)')
    page.clock.install(time=datetime(2026,11,17,12,0,0,tzinfo=timezone.utc));page.clock.pause_at(datetime(2026,11,17,12,0,1,tzinfo=timezone.utc));year(1972);page.get_by_role('button',name='Reproduzir viagem',exact=True).click()
    page.clock.fast_forward(4499);assert 'edicao=1972' in page.url
    page.clock.fast_forward(1);expect(page.locator('.time-machine-years button[aria-pressed=true]')).to_contain_text('1973')
    page.get_by_role('button',name='Pausar viagem').click();page.clock.fast_forward(9000);assert 'edicao=1973' in page.url
    page.get_by_role('button',name='Reproduzir viagem').click();year(2017);page.clock.fast_forward(9000);assert 'edicao=2017' in page.url
    year(2024);page.get_by_role('button',name='Reproduzir viagem').click();page.clock.fast_forward(4500)
    expect(page.get_by_role('button',name='Reproduzir viagem')).to_have_attribute('aria-pressed','false');assert 'edicao=2025' in page.url
    year(2026);page.get_by_role('button',name='Reproduzir viagem').click()
    expect(page.get_by_role('button',name='Pausar viagem')).to_be_visible();assert 'edicao=1972' in page.url
    visit('artistas','.archive-filters');page.clock.fast_forward(15000);assert '#/artistas' in page.url
    checks.append('Play cruza modos, pausa manualmente, termina em 2025 e não mantém timer fora do mapa')
    expect(page.locator('.archive-results')).to_contain_text(str(snapshot['artists']))
    page.get_by_role('textbox',name='Buscar artista histórico').fill('baggios');expect(page.locator('.historical-artist-card')).to_have_count(1)
    page.get_by_role('link',name='Consultar registros',exact=True).click()
    expect(page.locator('#artist-detail-title')).to_have_text('The Baggios')
    expect(page.locator('.artist-chronology>li')).to_have_count(7)
    assert page.locator('.artist-year').all_text_contents()==['2017','2018','2019','2022','2023','2024','2025']
    expect(page.locator('.artist-chronology')).to_contain_text('Palco Gal Costa')
    page.locator('.artist-chronology>li').nth(5).get_by_role('link',name='Ver no mapa',exact=True).click()
    expect(page.locator('#historical-venue-title')).to_have_text('Palco João Bebe Água')
    page.get_by_role('link',name='Voltar à exploração anterior').click();expect(page.locator('#artist-detail-title')).to_have_text('The Baggios')
    page.screenshot(path=str(OUT/'baggios-1440.png'),full_page=True)
    visit('artistas?busca=Arnaldo','.archive-filters');page.get_by_role('link',name='Consultar registros',exact=True).click()
    expect(page.locator('.artist-chronology>li')).to_have_count(2)
    expect(page.locator('.artist-chronology')).to_contain_text('Cultura e formação')
    visit('artistas?busca=Jorge%20Amado','.archive-filters');page.get_by_role('link',name='Consultar registros',exact=True).click()
    expect(page.locator('.artist-year')).to_have_text('Sem ano');expect(page.get_by_role('link',name='Ver no mapa',exact=True)).to_have_count(0)
    visit('artistas?busca=pérola','.archive-filters');expect(page.locator('.historical-artist-card')).to_have_count(0)
    visit('artistas?ordem=nome','.archive-filters');page.get_by_role('button',name='Próxima',exact=True).click()
    page.get_by_role('link',name='Consultar registros',exact=True).first.click();page.get_by_role('link',name='Voltar à exploração',exact=True).click();assert 'pagina=2' in page.url
    checks.append('Curadoria sem apagar o acervo; sete Baggios, duas linguagens de Arnaldo, sem ano e retorno preservado')
    page.close();c.close();c=b.new_context(viewport={'width':1440,'height':1000},locale='pt-BR');c.route('https://api.maptiler.com/**',mock_map);page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    # Native keyboard activation exercises the same residual-overlap picker.
    visit('mapa?dia=21','.festival-pin')
    pin=page.get_by_role('button',name='Abrir Museu de Arte Sacra',exact=True);pin.focus();pin.press('Enter')
    expect(page.locator('.nearby-picker')).to_be_visible()
    assert page.locator('.nearby-picker').evaluate("e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+30,r.y+24))}")
    page.get_by_role('button',name='Close popup',exact=True).click()
    checks.append('Popup de vizinhos acima dos pins, com título e controles clicáveis')
    for place in ['mariano','camara','sustentavel','feira','brincar','cortejo','cortejo-fixo','tsuru','reurb']:
        visit('mapa?dia=21&lugar='+place,'.place-photo img')
        img=page.locator('.place-photo img').first;img.scroll_into_view_if_needed();expect(img).to_have_js_property('complete',True)
        assert img.evaluate('i=>i.naturalWidth>0'),place
        expect(page.locator('.place-photo figcaption').first).not_to_have_text('')
    checks.append('Nove fotos pendentes agora carregam com crédito e contexto de arquivo/entorno')
    page.close();page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    axe=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8')
    for width,height in [(1440,1000),(768,1024),(390,844),(320,800)]:
        page.set_viewport_size({'width':width,'height':height})
        for path,selector,name in [('mapa?dia=21','.time-machine','current'),('mapa?modo=historico&edicao=2025','.time-machine','map'),('artistas','.archive-filters','artists'),('artistas?artista=baggios','#artist-detail-title','artist')]:
            visit(path,selector)
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(width,name)
            if width in [1440,390]:page.screenshot(path=str(OUT/f'{name}-{width}.png'),full_page=name not in ['map','current'])
            if width==390:
                page.add_script_tag(content=axe);result=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})')
                assert not result['violations'],(name,[(v['id'],[n['target'] for n in v['nodes']]) for v in result['violations']])
    page.emulate_media(reduced_motion='reduce');visit('artistas','.archive-filters')
    assert page.locator('.historical-artist-card').first.evaluate('(e)=>getComputedStyle(e).transitionDuration')=='0s'
    assert not errors,errors
    checks.append('1440/768/390/320 sem overflow, axe em quatro telas e movimento reduzido')
    (OUT/'checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(checks,ensure_ascii=False,indent=2));b.close()

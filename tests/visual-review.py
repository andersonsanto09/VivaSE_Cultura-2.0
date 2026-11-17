"""Acceptance for map collision handling, category meaning and current schedule."""
import json,math
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
BASE='http://127.0.0.1:5173/'
out=Path('tmp/visual-review');out.mkdir(parents=True,exist_ok=True)
checks=[];errors=[]
def reveal_filters(page):
    panel=page.locator("details.filter-disclosure").first
    panel.wait_for(state="visible")
    if panel.get_attribute("open") is None:
        panel.locator("summary").click()

with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
    context=browser.new_context(viewport={'width':1440,'height':1000},locale='pt-BR')
    def mock(route):
        if '.svg' in route.request.url:route.fulfill(status=200,content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg" width="82" height="24"/>')
        else:route.fulfill(status=200,content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[{'id':'background','type':'background','paint':{'background-color':'#e9eee3'}}]}))
    context.route('https://api.maptiler.com/**',mock)
    page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    def coverage(expected=20):
        expect(page.locator('.festival-pin')).to_have_count(20)
        expect(page.locator('.map-cluster')).to_have_count(0)
        container=page.locator('.maplibregl-map').bounding_box()
        page.wait_for_function("([r,expected])=>Array.from(document.querySelectorAll('.festival-pin')).filter(el=>{const b=el.getBoundingClientRect();return b.left>=r.x && b.right<=r.x+r.width && b.top>=r.y && b.bottom<=r.y+r.height}).length===expected",arg=[container,expected])
        overlaps=page.evaluate("""()=>{
            const map=document.querySelector('.maplibregl-map').getBoundingClientRect();
            const controls=[...document.querySelectorAll('.map-tools button,.map-view-controls button,.map-caption')].map(el=>el.getBoundingClientRect());
            return [...document.querySelectorAll('.festival-pin')].filter(el=>{
                const b=el.getBoundingClientRect();
                if(b.left<map.left || b.right>map.right || b.top<map.top || b.bottom>map.bottom)return false;
                return controls.some(r=>b.left<r.right && b.right>r.left && b.top<r.bottom && b.bottom>r.top);
            }).map(el=>el.getAttribute('aria-label'));
        }""")
        assert not overlaps,overlaps
    page.goto(BASE+'#/mapa');coverage(19)
    expect(page.locator('.festival-pin .pin-number')).to_have_count(0)
    assert page.locator('.festival-pin').first.evaluate('el=>parseFloat(getComputedStyle(el).width)')==34
    page.get_by_role('button',name='Ver todos os espaços',exact=True).click();coverage()
    page.screenshot(path=str(out/'all-individual-pins.png'))
    for _ in range(7):
        page.locator('.maplibregl-ctrl-zoom-out').click();page.wait_for_timeout(350)
    # At very low zoom, deliberately find residual visual neighbours and use the
    # real button handler. The picker must offer both, without changing zoom.
    index=page.locator('.festival-pin').evaluate_all("els=>{const boxes=els.map(el=>el.getBoundingClientRect());for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++)if(Math.hypot(boxes[i].x-boxes[j].x,boxes[i].y-boxes[j].y)<20)return i;return -1}")
    assert index>=0
    pin=page.locator('.festival-pin').nth(index);before=pin.get_attribute('style')
    pin.evaluate('el=>el.click()')
    expect(page.get_by_role('region',name='Espaços próximos')).to_be_visible()
    assert pin.get_attribute('style')==before
    assert page.locator('.nearby-picker>button').count()>1
    page.keyboard.press('Escape');expect(page.locator('.nearby-picker')).to_have_count(0)
    pin.evaluate('el=>el.click()');page.locator('.nearby-picker>button').first.click()
    page.get_by_role('button',name='Ver detalhes',exact=True).click()
    expect(page.locator('.place-detail h2')).to_be_visible()
    expect(page.locator('.festival-pin .pin-number')).to_have_count(1)
    checks.append('20 pins individuais; 19 centrais na abertura; visão geral inclui Bica; fallback residual abre lista sem zoom')
    page.goto(BASE)
    title=page.locator('.hero-copy h1')
    assert title.evaluate('el=>getComputedStyle(el).letterSpacing')=='normal' or float(title.evaluate('el=>parseFloat(getComputedStyle(el).letterSpacing)||0'))==0
    for category in ['Música','Artes cênicas','Cultura e formação','Feiras e experiências','Cortejos']:
        page.get_by_role('link',name=category,exact=False).click()
        reveal_filters(page)
        expect(page.get_by_role('button',name='Filtrar '+category,exact=True)).to_have_attribute('aria-pressed','true')
        assert page.locator('.place-row').count()>0
        page.goto(BASE)
    checks.append('Cinco cards da entrada filtram categorias reais; título sem tracking negativo')
    page.goto(BASE+'#/programacao?dia=21')
    reveal_filters(page)
    page.get_by_role('button',name='Filtrar Música',exact=True).click()
    count=page.locator('.schedule-list>li').count();assert 0<count<51
    reveal_filters(page)
    page.get_by_role('combobox',name='Espaço da programação').click()
    page.get_by_role('option',name='Palco João Bebe Água',exact=True).click()
    expect(page.locator('.schedule-list>li')).to_have_count(4)
    page.get_by_role('button',name='Limpar filtros').click()
    page.clock.set_fixed_time('2026-11-21T17:00:00Z')
    page.reload();page.get_by_role('button',name='Acontecendo agora',exact=True).click()
    expect(page.get_by_role('button',name='Sábado, 21 de novembro')).to_have_attribute('aria-pressed','true')
    assert page.locator('.schedule-list>li').count()>0
    expect(page.locator('.schedule-list>li:not(.is-live)')).to_have_count(0)
    expect(page.get_by_text('Simone',exact=True)).to_have_count(0)
    page.locator('.activity-accordion button').first.click()
    expect(page.locator('.activity-accordion button').first).to_have_attribute('aria-expanded','true')
    page.screenshot(path=str(out/'agenda-live-desktop.png'),full_page=True)
    checks.append('Categorias e select Radix filtram; relógio fixado testa agora; shows sem fim não entram; accordion abre')
    for width in [1440,768,390,360]:
        page.set_viewport_size({'width':width,'height':1000})
        for path,label in [('', 'home'),('#/mapa','map-list'),('#/programacao?dia=21','schedule')]:
            page.goto(BASE+path);page.wait_for_load_state('networkidle')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,label)
            page.screenshot(path=str(out/f'{label}-{width}.png'),full_page=True)
            if label=='map-list' and width<=800:
                page.get_by_role('button',name='Mapa',exact=True).click();coverage(19)
                page.get_by_role('button',name='Ver todos os espaços',exact=True).click();coverage()
                page.screenshot(path=str(out/f'map-{width}.png'))
    page.goto(BASE+'#/programacao?dia=21')
    page.emulate_media(reduced_motion="reduce")
    day_colors=[]
    for name in ['Sexta-feira, 20 de novembro','Sábado, 21 de novembro','Domingo, 22 de novembro']:
        page.get_by_role('button',name=name).click()
        day_colors.append(page.get_by_role('button',name=name).evaluate('el=>getComputedStyle(el).backgroundColor'))
    page.goto(BASE+'#/mapa')
    for i,name in enumerate(['Sexta-feira, 20 de novembro','Sábado, 21 de novembro','Domingo, 22 de novembro']):
        page.get_by_role('button',name=name).click()
        assert page.get_by_role('button',name=name).evaluate('el=>getComputedStyle(el).backgroundColor')==day_colors[i]
    assert not errors,errors
    result={'checks':checks,'pageErrors':errors,'dayColorsConsistent':True,'widths':[1440,768,390,360],'mapStyle':'mocked'}
    (out/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(result,ensure_ascii=False,indent=2))
    browser.close()

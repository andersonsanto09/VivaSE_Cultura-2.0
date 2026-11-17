"""Visual acceptance: time rail, first-fold content, interaction and reduced motion.
Run with the local Vite server; cartography is unnecessary for these layout checks.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

out = Path('tmp/redesign')
out.mkdir(parents=True, exist_ok=True)
checks = []
with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width':1440,'height':1000}, locale='pt-BR')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    for width, height in [(1440,1000),(768,1024),(390,844),(320,800)]:
        page.set_viewport_size({'width':width,'height':height})
        page.goto('http://127.0.0.1:5173/')
        page.wait_for_load_state('networkidle')
        expect(page.locator('.start-card')).to_have_count(5)
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
        assert page.get_by_role('link',name='Explorar o mapa').bounding_box()['y'] < height
        page.screenshot(path=str(out/f'home-{width}.png'),full_page=True)
        page.goto('http://127.0.0.1:5173/#/programacao?dia=21')
        page.wait_for_load_state('networkidle')
        expect(page.locator('.timeline-row')).to_have_count(51)
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
        assert page.locator('.timeline-row').first.bounding_box()['y'] < height - 100
        # Range measures actual glyphs, catching 15h30 spilling past the time rail.
        overflow = page.locator('.timeline-time').evaluate_all('''els=>els.flatMap(el=>{
            const range=document.createRange();range.selectNodeContents(el.querySelector('time>span'));
            const text=range.getBoundingClientRect(),rail=el.getBoundingClientRect();
            return text.right>rail.right-4?[el.textContent]:[];
        })''')
        assert not overflow, (width, overflow)
        page.screenshot(path=str(out/f'agenda-{width}.png'))
        checks.append({'width':width,'firstActivityY':round(page.locator('.timeline-row').first.bounding_box()['y']),'timeRailOverflow':False})

    page.set_viewport_size({'width':1440,'height':1000})
    page.goto('http://127.0.0.1:5173/')
    card = page.locator('.start-card').first
    card.scroll_into_view_if_needed()
    page.mouse.move(0,0)
    before = card.bounding_box()['y']
    card.hover()
    expect(card).to_have_css('transform','matrix(1, 0, 0, 1, 0, -2)')
    assert abs(card.bounding_box()['y'] - (before-2)) < .2
    page.emulate_media(reduced_motion='reduce')
    expect(card).to_have_css('transform','none')
    expect(card).to_have_css('transition-duration','0s')

    page.goto('http://127.0.0.1:5173/#/programacao?dia=21')
    page.locator('.schedule-filter-panel>summary').click()
    page.get_by_role('button',name='Filtrar Música',exact=True).click()
    expect(page.get_by_role('button',name='Filtrar Música',exact=True)).to_have_attribute('aria-pressed','true')
    assert 0 < page.locator('.timeline-row').count() < 51
    page.get_by_role('button',name='Limpar filtros').click()
    expect(page.locator('.timeline-row')).to_have_count(51)
    assert not errors, errors
    result={'layouts':checks,'hoverAndReducedMotion':True,'categoryRecovery':True,'pageErrors':errors}
    (out/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2))
    browser.close()

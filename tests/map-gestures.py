"""Mouse gestures against the actual MapLibre renderer; basemap mocked, no API quota."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
    context=browser.new_context(viewport={'width':1440,'height':900})
    def mock(route):
        if '.svg' in route.request.url:
            route.fulfill(status=200,content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg" width="82" height="24"/>')
        else:
            route.fulfill(status=200,content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[{'id':'background','type':'background','paint':{'background-color':'#e9eee3'}}]}))
    context.route('https://api.maptiler.com/**',mock)
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:5173/#/mapa')
    expect(page.locator('.festival-pin')).to_have_count(20)
    page.wait_for_load_state('networkidle')
    canvas=page.locator('.maplibregl-canvas');box=canvas.bounding_box()
    x=box['x']+box['width']*.75;y=box['y']+box['height']*.5
    before=page.locator('.festival-pin').first.bounding_box()['width']
    page.mouse.move(x,y);page.mouse.wheel(0,600)
    page.wait_for_function('(before)=>document.querySelector(".festival-pin").getBoundingClientRect().width < before*.95',arg=before)
    page.get_by_role('button',name='Inclinar mapa',exact=True).click()
    expect(page.get_by_role('button',name='Vista de cima')).to_have_attribute('aria-pressed','true')
    page.get_by_role('button',name='Vista de cima').click()
    for button in ['middle','right']:
        page.mouse.move(x,y);page.mouse.down(button=button)
        page.mouse.move(x+100,y-100,steps=12);page.mouse.up(button=button)
        expect(page.get_by_role('button',name='Vista de cima')).to_have_attribute('aria-pressed','true')
        page.get_by_role('button',name='Vista de cima').click()
    page.set_viewport_size({'width':390,'height':900})
    page.get_by_role('button',name='Mapa',exact=True).click()
    expect(page.get_by_role('button',name='Inclinar mapa',exact=True)).to_be_visible()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    out=Path('tmp/phase-2-qa');out.mkdir(parents=True,exist_ok=True)
    page.screenshot(path=str(out/'map-gesture-controls-mobile.png'))
    assert not errors,errors
    print(json.dumps({'wheelZoom':True,'middleDragPitch':True,'rightDragPitch':True,'pitchToggle':True,'mobileControl':True,'pageErrors':errors}))
    browser.close()

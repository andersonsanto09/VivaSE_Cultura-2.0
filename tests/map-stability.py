"""Regression for the zoom jump shown in the 17/11 video.
Measure zoom-scaled marker separation relative to two geographic anchors; no app debug hooks or changes to reference coordinates are required.
"""
import json,subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
places=json.loads(subprocess.check_output(['node','--experimental-strip-types','--input-type=module','-e',"import {places} from './src/data/festival.ts';console.log(JSON.stringify(places))"],text=True,encoding='utf-8'))
points=[{'id':p['id'],'name':p['name'],'lat':p['coordinates'][0],'lng':p['coordinates'][1]} for p in places if p.get('coordinates') and p['id']!='bica']
out=Path('tmp/zoom-stability');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
    context=browser.new_context(viewport={'width':1440,'height':1000},locale='pt-BR')
    def mock(route):
        if '.svg' in route.request.url:route.fulfill(status=200,content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg" width="82" height="24"/>')
        else:route.fulfill(status=200,content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[{'id':'background','type':'background','paint':{'background-color':'#e9eee3'}}]}))
    context.route('https://api.maptiler.com/**',mock)
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:5173/#/mapa')
    expect(page.locator('.festival-pin')).to_have_count(20);page.wait_for_load_state('networkidle')
    page.evaluate("""points=>{
        window.zoomSamples=[];window.collectZoom=true;
        const merc=lat=>Math.log(Math.tan(Math.PI/4+lat*Math.PI/360));
        const sample=()=>{
            const markers=points.map(p=>{
                const el=[...document.querySelectorAll('.festival-pin')].find(el=>el.getAttribute('aria-label')==='Abrir '+p.name);
                const box=el.closest('.maplibregl-marker').getBoundingClientRect();
                return {...p,x:box.left+box.width/2,y:box.bottom};
            });
            const a=markers.find(p=>p.id==='frei'),b=markers.find(p=>p.id==='brincar');
            if(Math.abs(b.x-a.x)>1 && Math.abs(b.y-a.y)>1){
                const factor=Math.min(1,(b.x-a.x)/(b.lng-a.lng)/(512*2**16.5/360));
                window.zoomSamples.push({factor,pins:markers.map(p=>({id:p.id,dx:p.x-(a.x+(p.lng-a.lng)/(b.lng-a.lng)*(b.x-a.x)),dy:p.y-(a.y+(merc(p.lat)-merc(a.lat))/(merc(b.lat)-merc(a.lat))*(b.y-a.y))}))});
            }
            if(window.collectZoom)requestAnimationFrame(sample);
        };requestAnimationFrame(sample);
    }""",points)
    box=page.locator('.maplibregl-canvas').bounding_box();x=box['x']+box['width']*.7;y=box['y']+box['height']*.55
    page.mouse.move(x,y)
    for delta in [600,600,600,600,600,600,-600,-600,-600,-600,-600,-600]:
        page.mouse.wheel(0,delta);page.wait_for_timeout(400)
    for _ in range(7):
        button=page.locator('.maplibregl-ctrl-zoom-out')
        if not button.is_enabled():break
        button.click();page.wait_for_timeout(350)
    samples=page.evaluate('()=>{window.collectZoom=false;return window.zoomSamples}')
    assert len(samples)>20,len(samples)
    baseline={p['id']:p for p in samples[0]['pins']}
    max_drift=max(max(abs(p['dx']-baseline[p['id']]['dx']*sample['factor']/samples[0]['factor']),abs(p['dy']-baseline[p['id']]['dy']*sample['factor']/samples[0]['factor'])) for sample in samples for p in sample['pins'])
    low=[sample for sample in samples if sample['factor']<.04]
    assert low,{'minimumFactor':min(sample['factor'] for sample in samples)}
    low_offset=max(max(abs(p['dx']),abs(p['dy'])) for sample in low for p in sample['pins'])
    assert low_offset<4,{'overviewOffsetPx':low_offset}
    assert max_drift<3.5,{'maxDriftPx':max_drift,'frames':len(samples)}
    page.get_by_role('button',name='Inclinar mapa',exact=True).click()
    expect(page.get_by_role('button',name='Vista de cima')).to_be_visible()
    before_resize=page.locator('.festival-pin').first.get_attribute('style')
    page.set_viewport_size({'width':1440,'height':940})
    expect(page.get_by_role('button',name='Vista de cima')).to_be_visible()
    assert page.locator('.festival-pin').first.get_attribute('style')==before_resize
    page.get_by_role('button',name='Vista de cima').click()
    page.get_by_role('button',name='Legenda',exact=True).click()
    expect(page.get_by_role('region',name='Legenda do mapa')).to_be_visible()
    page.keyboard.press('Escape');expect(page.get_by_role('button',name='Legenda',exact=True)).to_be_focused()
    page.goto('http://127.0.0.1:5173/#/mapa?dia=20&lugar=bica')
    expect(page.get_by_role('heading',name='Palco Samba na Bica',exact=True)).to_be_visible()
    page.screenshot(path=str(out/'detail-desktop.png'))
    page.set_viewport_size({'width':390,'height':900})
    page.get_by_role('button',name='Mapa',exact=True).click()
    page.get_by_role('button',name='Legenda',exact=True).click()
    expect(page.get_by_role('region',name='Legenda do mapa')).to_be_visible()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.screenshot(path=str(out/'legend-mobile.png'))
    assert not errors,errors
    result={'sampledFrames':len(samples),'maxOffsetDriftPx':round(max_drift,3),'tolerancePx':3.5,'overviewOffsetPx':round(low_offset,3),'note':'Continuous separation shrinks with map scale; tolerance includes pixel rounding and event timing; source coordinates remain intact.','legendKeyboard':True,'resizePreservesPerspective':True,'pageErrors':errors}
    (out/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(result,ensure_ascii=False,indent=2))
    browser.close()

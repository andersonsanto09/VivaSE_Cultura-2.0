"""Production preview: cold-load samples, real screenshots and map failure recovery.
Run after npm run build, with npm run preview -- --port 4174.
Measurements are laboratory samples, not field Core Web Vitals.
"""
from pathlib import Path
import hashlib,json,statistics,urllib.request
from playwright.sync_api import sync_playwright,expect

BASE='http://127.0.0.1:4174/'
OUT=Path('tmp/phase-5');OUT.mkdir(parents=True,exist_ok=True)
KIT=Path('docs/apresentacao');KIT.mkdir(parents=True,exist_ok=True)
result={'date':'2026-11-19','environment':'Edge headless, Windows, production preview, software WebGL', 'samples':[]}
url='https://anexos.saocristovao.se.gov.br/storage/files/62/FASC%202026_Programa%C3%A7%C3%A3o%20Completa%20v4.pdf'
remote=urllib.request.urlopen(url,timeout=40).read()
local=Path('docs/fontes/programacao-fasc-2026-v4.pdf').read_bytes()
result['schedule']={'url':url,'local_sha256':hashlib.sha256(local).hexdigest(),'remote_sha256':hashlib.sha256(remote).hexdigest(),'identical':remote==local}
assert remote==local,'Official PDF changed: reconcile before presenting.'
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
 result['browser']=b.version
 for i in range(3):
  c=b.new_context(viewport={'width':390,'height':844},locale='pt-BR');page=c.new_page()
  client=c.new_cdp_session(page)
  client.send('Network.enable');client.send('Network.setCacheDisabled',{'cacheDisabled':True})
  client.send('Network.emulateNetworkConditions',{'offline':False,'latency':150,'downloadThroughput':200000,'uploadThroughput':93750})
  client.send('Emulation.setCPUThrottlingRate',{'rate':4})
  page.add_init_script("new PerformanceObserver(l=>{for(const e of l.getEntries())window.pitchLCP=e.startTime}).observe({type:'largest-contentful-paint',buffered:true})")
  page.goto(BASE,wait_until='load');expect(page.locator('h1')).to_be_visible();page.wait_for_timeout(5000)
  result['samples'].append(page.evaluate("({lcp_ms:Math.round(window.pitchLCP||0),dcl_ms:Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),resource_bytes:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0)})"))
  c.close()
 result['profile']={'viewport':'390x844','latency_ms':150,'download_bytes_s':200000,'cpu_slowdown':4,'cache':'disabled','observation':'5 seconds after load','origin':'local Vite preview; does not emulate GitHub CDN compression'}
 result['median_lcp_ms']=statistics.median(s['lcp_ms'] for s in result['samples'])
 c=b.new_context(viewport={'width':1440,'height':900},locale='pt-BR');page=c.new_page();errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 screens=[('01-inicio',''),('02-orientacao','#/mapa?dia=21&lugar=joao'),('03-programacao','#/programacao?dia=21&busca=Morgana'),('04-cultura','#/roteiros?dia=21&roteiro=patrimonio'),('05-historia','#/mapa?modo=historico&edicao=2025&lugar=2025-joao'),('06-memorias','#/memorias?dia=21')]
 for name,path in screens:
  page.goto(BASE+path);page.wait_for_load_state('networkidle');page.evaluate('document.fonts.ready');page.wait_for_timeout(1500)
  expect(page.locator('h1')).to_be_visible()
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),name
  if 'mapa' in path:
   expect(page.locator('.maplibregl-canvas')).to_be_visible()
   assert page.locator('.map-network').count()==0,'Real map failed; do not present this screenshot as loaded cartography.'
  page.screenshot(path=str(KIT/(name+'.jpg')),type='jpeg',quality=82)
 result['screenshots']=[n+'.jpg' for n,_ in screens]
 # Fail only the external map provider, preserving the app and its venue list.
 c.route('https://api.maptiler.com/**',lambda r:r.abort())
 page.goto(BASE+'#/mapa?dia=21');expect(page.get_by_text('O fundo do mapa não carregou completamente.',exact=False)).to_be_visible(timeout=20000)
 expect(page.get_by_role('button',name='Palco João Bebe Água',exact=False).first).to_be_visible()
 result['map_provider_failure']='visible status and usable venue list'
 page.goto(BASE+'#/programacao?dia=21');expect(page.locator('.timeline-row')).to_have_count(51)
 result['schedule_independent_of_map']=True
 result['page_errors']=errors
 assert not errors,errors
 c.close();b.close()
(OUT/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(result,ensure_ascii=False,indent=2))

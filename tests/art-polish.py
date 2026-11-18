"""Editorial visuals: real images, working journeys, compact agenda and reflow."""
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import json
BASE='http://127.0.0.1:5173/'
OUT=Path('tmp/art-polish');checks=[]
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader']);c=b.new_context(viewport={'width':1440,'height':1000},locale='pt-BR')
 c.route('https://api.maptiler.com/**',lambda r:r.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg"/>' ) if '.svg' in r.request.url else r.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]})))
 page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def visit(path):
  page.goto(BASE+'#/'+path);page.wait_for_load_state('networkidle')
 def loaded(img):
  img.scroll_into_view_if_needed();expect(img).to_have_js_property('complete',True);assert img.evaluate('e=>e.naturalWidth>0')
 visit('');expect(page.locator('.editorial-grid>article')).to_have_count(3)
 for img in page.locator('.home-editorial img').all():loaded(img)
 page.locator('.city-story .editorial-action').click();expect(page.locator('.cultural-stops')).to_be_visible()
 visit('');page.locator('.archive-story .editorial-action').click();expect(page.locator('#artist-detail-title')).to_have_text('The Baggios')
 checks.append('Home com cidade, depoimento atribuído e trajetória com links funcionais')
 for query in ['Alceu','Baggios','Gaby','Marina','Baiana','Karol','Olodum','Catto']:
  visit('artistas?busca='+query);img=page.locator('.artist-portrait img');expect(img).to_have_count(1);loaded(img)
  ratio=img.evaluate('e=>e.clientWidth/e.clientHeight');assert abs(ratio-4/3)<.02,(query,ratio)
  expect(page.locator('.artist-portrait figcaption a')).to_have_attribute('href',__import__('re').compile('https://www.saocristovao.se.gov.br/'))
 page.route('**/images/artists/baggios.jpg',lambda r:r.abort());visit('artistas?busca=Baggios');page.reload();page.wait_for_load_state('networkidle')
 expect(page.locator('.artist-typographic')).to_be_visible();expect(page.get_by_role('link',name='The Baggios',exact=True)).to_be_visible();page.unroute('**/images/artists/baggios.jpg')
 visit('artistas?artista=lamparina');loaded(page.locator('.artist-poster img'))
 checks.append('Nove fotos identificadas, proporções consistentes, crédito e alternativa tipográfica em falha')
 visit('mapa?dia=21');expect(page.locator('.place-thumbnail')).to_have_count(20)
 page.locator('.place-row[data-place=joao]').click();expect(page.locator('.place-cover img')).to_be_visible()
 expect(page.locator('.stage-artists')).to_be_visible()
 checks.append('Miniaturas nos 20 espaços, imagem de abertura e memória do palco preservadas')
 visit('programacao?dia=21');expect(page.locator('.timeline-row')).to_have_count(51);expect(page.locator('.is-editorial')).to_have_count(2)
 regular=page.locator('.timeline-row:not(.is-editorial) .event-card').first.bounding_box()['height'];assert regular<165,regular
 for row in page.locator('.is-editorial').all():
  expect(row).to_contain_text('Seleção VivaSE');loaded(row.locator('img'));expect(row.locator('figcaption')).not_to_have_text('')
 checks.append('51 atividades preservadas, linhas comuns compactas e dois destaques com fotos contextualizadas')
 axe=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8')
 for width in [1440,768,390,320]:
  page.set_viewport_size({'width':width,'height':1000 if width>700 else 844})
  for name,path in [('home',''),('map','mapa?dia=21'),('detail','mapa?dia=21&lugar=joao'),('agenda','programacao?dia=21'),('artists','artistas'),('artist','artistas?artista=baggios')]:
   visit(path);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,name)
   if width==390:
    page.add_script_tag(content=axe);result=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})')
    assert not result['violations'],(name,[(v['id'],[n['target'] for n in v['nodes']]) for v in result['violations']])
 checks.append('Seis telas sem overflow em 1440/768/390/320; axe em seis telas móveis')
 assert not errors,errors
 (OUT/'checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(checks,ensure_ascii=False,indent=2));b.close()

"""Retratos corrigidos, rastreabilidade, ausências e recuperação após falha."""
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import json
out=Path('tmp/artist-audit');out.mkdir(parents=True,exist_ok=True);audit=json.loads(Path('docs/fontes/expansao-fotos-artistas-2026-11-18.json').read_text(encoding='utf8'))
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True);page=b.new_page(viewport={'width':390,'height':844},locale='pt-BR');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 for photo in audit['portraits']:
  page.goto('http://127.0.0.1:5173/#/artistas?artista='+photo['artistId']);page.wait_for_load_state('networkidle');expect(page.locator('#artist-detail-title')).to_have_text(photo['name'])
  img=page.locator('.artist-poster img');expect(img).to_have_count(1);img.scroll_into_view_if_needed();expect(img).to_have_js_property('complete',True);assert img.evaluate('e=>e.naturalWidth>0');assert img.get_attribute('src').endswith(photo['file']);expect(page.locator('.artist-poster .artist-portrait figcaption a').first).to_have_attribute('href',photo['source'])
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  if photo['artistId'] in ['gaby','marina','baiana','edcity']:page.locator('.artist-poster').screenshot(path=str(out/(photo['artistId']+'-corrigido.png')))
 page.goto('http://127.0.0.1:5173/#/artistas?busca=Gilberto');expect(page.locator('.historical-artist-card img')).to_have_count(1);expect(page.locator('.artist-typographic')).to_have_count(0)
 page.route('**/images/artists/gaby-fasc-2025.jpg',lambda r:r.abort());page.goto('http://127.0.0.1:5173/#/artistas?artista=gaby');expect(page.locator('.artist-poster .artist-typographic')).to_contain_text('A foto não carregou.')
 page.goto('http://127.0.0.1:5173/#/artistas?artista=marina');expect(page.locator('.artist-poster img')).to_be_visible();expect(page.locator('.artist-poster .artist-typographic')).to_have_count(0)
 page.unroute('**/images/artists/gaby-fasc-2025.jpg');page.goto('http://127.0.0.1:5173/#/artistas?busca=Gaby');expect(page.locator('.historical-artist-card img')).to_have_attribute('src','/images/artists/gaby-fasc-2025.jpg')
 page.add_script_tag(content=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8'));r=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');assert not r['violations'],[(v['id'],[n['target'] for n in v['nodes']]) for v in r['violations']]
 assert not errors,errors
 print(json.dumps({'retratos_verificados':len(audit['portraits']),'correcoes':['gaby','marina','baiana'],'reassociacao':'edcity','ausencias_identificadas':True,'recuperacao_apos_falha':True,'axe_sem_violacoes':True},ensure_ascii=False));b.close()

from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import json
OUT=Path('tmp/status-research');BASE='http://127.0.0.1:5173/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader']);c=b.new_context(viewport={'width':390,'height':844},locale='pt-BR');c.route('https://api.maptiler.com/**',lambda r:r.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]})))
 page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 for id,name,slug in [('artist-joao-gomes','João Gomes','terceira-noite-de-fasc'),('artist-pabllo-vittar','Pabllo Vittar','segunda-noite-de-shows')]:
  page.goto(BASE+'#/artistas?busca='+name);page.wait_for_load_state('networkidle');expect(page.locator('.historical-artist-card .evidence-label')).to_have_text('Participação documentada');page.get_by_role('link',name='Consultar registros',exact=True).click();expect(page.locator('#artist-detail-title')).to_have_text(name);expect(page.locator('.artist-chronology .evidence-label')).to_have_text('Participação documentada');page.locator('.historical-proof summary').click();assert slug in page.locator('.historical-proof a').first.get_attribute('href');expect(page.locator('.historical-proof')).not_to_contain_text('Conferência individual desta referência recebida ainda pendente');page.screenshot(path=str(OUT/(id+'.png')),full_page=True)
 page.goto(BASE+'#/artistas?busca=Itamar%20Vieira');expect(page.locator('.historical-artist-card .evidence-label')).to_have_text('Participação substituída');page.get_by_role('link',name='Consultar registros',exact=True).click();page.locator('.historical-proof summary').click();expect(page.locator('.historical-proof')).to_contain_text('Socorro Acioli')
 page.goto(BASE+'#/artistas?busca=Baggios&edicao=2018');expect(page.locator('.historical-artist-card .evidence-label')).to_have_text('Registro de programação')
 page.goto(BASE+'#/artistas?artista=baggios');expect(page.locator('.artist-chronology>li')).to_have_count(7)
 page.goto(BASE+'#/programacao?dia=20&atividade=joao-20-2');expect(page.get_by_role('dialog')).to_contain_text('programação anunciada');page.keyboard.press('Escape')
 for width in [1440,390,320]:
  page.set_viewport_size({'width':width,'height':1000 if width>700 else 844});page.goto(BASE+'#/artistas?busca=Pabllo');page.wait_for_load_state('networkidle');assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  if width==390:
   page.add_script_tag(content=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8'));r=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');assert not r['violations'],[(v['id'],[n['target'] for n in v['nodes']]) for v in r['violations']]
 assert not errors,errors;print('João Gomes e Pabllo documentados com fonte de cobertura; substituição distinta; fonte de programação preservada; sete Baggios e anúncio de 2026 intactos; reflow e axe aprovados.');b.close()

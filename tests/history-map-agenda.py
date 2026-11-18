"""Historical pins: preview → agenda / about, date filters, empty states and mobile."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright,expect

OUT=Path('tmp/history-map-review');OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:5173/#/mapa?modo=historico&edicao='
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader'])
 c=b.new_context(viewport={'width':1440,'height':1000},locale='pt-BR')
 c.route('https://api.maptiler.com/**',lambda r:r.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg"/>') if '.svg' in r.request.url else r.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]})))
 page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def visit(edition='2025',venue=''):
  page.goto(BASE+edition+('&lugar='+venue if venue else ''));page.wait_for_load_state('networkidle')
 visit();expect(page.locator('.edition-dossier')).not_to_have_attribute('open','')
 page.get_by_role('button',name='Abrir Palco João Bebe Água',exact=True).click()
 expect(page.locator('.historical-selection')).to_be_visible();expect(page.locator('.historical-selection')).to_contain_text('20/11')
 page.get_by_role('button',name='Ver detalhes',exact=True).click()
 expect(page.locator('.historical-venue-about')).to_be_visible();expect(page.locator('.edition-dossier')).to_have_count(0)
 page.get_by_role('button',name='Programação',exact=False).filter(has_text='13').click()
 expect(page.locator('.historical-agenda-row')).to_have_count(13)
 expect(page.locator('.performance-edition,.performance-place')).to_have_count(0)
 group=page.get_by_role('group',name='Filtrar programação por data')
 group.get_by_role('button',name='20/11',exact=True).focus();page.keyboard.press('Enter')
 expect(page.locator('.historical-agenda-day')).to_have_count(1)
 rows=page.locator('.historical-agenda-row').count();assert 0<rows<13
 group.get_by_role('button',name='Todas',exact=True).click();expect(page.locator('.historical-agenda-row')).to_have_count(13)
 first=page.locator('.historical-agenda-row').first
 first.locator('summary').click();expect(first.locator('.historical-sources a').first).to_be_visible()
 first.locator('summary').click();page.locator('.historical-workspace').screenshot(path=str(OUT/'agenda-desktop.png'))
 page.get_by_role('button',name='Todos os espaços de 2025',exact=True).click()
 expect(page.locator('.historical-venue-list')).to_be_visible()
 page.get_by_role('button',name='Abrir Palco João Bebe Água',exact=True).click();page.get_by_role('button',name='Fechar resumo do espaço',exact=True).click();expect(page.locator('.historical-selection')).to_have_count(0)
 visit('2018','2018-palco-antonio-mariano');expect(page.locator('.historical-empty')).to_contain_text('A programação deste espaço ainda não está no acervo.')
 page.get_by_role('button',name='Sobre o espaço',exact=True).click();expect(page.locator('.historical-venue-about')).to_contain_text('Localização indisponível')
 page.get_by_role('button',name='Edição de 2025',exact=True).click();expect(page.locator('.historical-venue-detail')).to_have_count(0)
 for width in [1440,768,390,320]:
  page.set_viewport_size({'width':width,'height':1000 if width>800 else 844});visit('2025','2025-joao')
  expect(page.locator('.historical-agenda')).to_be_visible();assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  page.add_script_tag(content=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8'))
  result=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})')
  assert not result['violations'],[(v['id'],[n['target'] for n in v['nodes']]) for v in result['violations']]
  if width==390:page.screenshot(path=str(OUT/'agenda-mobile.png'),full_page=True)
 page.set_viewport_size({'width':390,'height':844});visit();page.get_by_role('button',name='Mapa',exact=True).click();page.get_by_role('button',name='Abrir Palco João Bebe Água',exact=True).click()
 if page.locator('.nearby-picker').is_visible():page.locator('.nearby-picker').get_by_role('button',name='Palco João Bebe Água',exact=True).click()
 expect(page.locator('.historical-agenda')).to_be_visible();expect(page.get_by_role('button',name='Programação e detalhes',exact=True)).to_have_attribute('aria-pressed','true')
 assert not errors,errors
 print(json.dumps({'desktop_preview':True,'agenda_rows':13,'date_filter':True,'separate_about':True,'missing_schedule':True,'mobile_pin_opens_agenda':True,'widths':[1440,768,390,320],'axe_violations':0}));b.close()

"""Regression for the supplied video: sidebar scroll must not create a blank page."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright,expect
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader']);c=b.new_context(viewport={'width':1920,'height':1080},locale='pt-BR')
 c.route('https://api.maptiler.com/**',lambda r:r.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg"/>') if '.svg' in r.request.url else r.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]})))
 page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def visit(year,venue):
  page.goto(f'http://127.0.0.1:5173/#/mapa?modo=historico&edicao={year}&lugar={venue}');page.wait_for_load_state('networkidle')
 def no_blank():
  assert page.evaluate('document.documentElement.scrollHeight<=Math.ceil(Math.max(innerHeight,document.querySelector("main").getBoundingClientRect().bottom+scrollY))+1'), 'Elementos ocultos não podem estender a página além do mapa/painel'
 visit('2025','2025-joao');expect(page.get_by_role('button',name='Sem data',exact=True)).to_have_count(0)
 page.get_by_role('group',name='Filtrar programação por data').get_by_role('button',name='21/11',exact=True).click()
 for name in ['Pabllo Vittar','Marcelo D2']:
  row=page.locator('.historical-agenda-row').filter(has=page.get_by_role('link',name=name,exact=True));expect(row).to_contain_text('22h00' if name=='Pabllo Vittar' else '00h00')
 page.get_by_role('group',name='Filtrar programação por data').get_by_role('button',name='22/11',exact=True).click()
 expect(page.locator('.historical-agenda-row').filter(has=page.get_by_role('link',name='João Gomes',exact=True))).to_contain_text('22h00')
 for year,venue in [('2025','2025-joao'),('2025','2025-salao-de-literatura-manoel-ferreira'),('2024','2024-frei'),('2005','2005-palco-sao-francisco'),('1972','1972-igreja-de-sao-francisco')]:
  visit(year,venue)
  # Invalid direct links remain safe; the full edition list also contains hidden records.
  no_blank();panel=page.locator('.historical-panel');panel.evaluate('e=>e.scrollTop=0');start=page.evaluate('scrollY');box=panel.bounding_box();page.mouse.move(box['x']+100,box['y']+200)
  for _ in range(12):page.mouse.wheel(0,1100);page.wait_for_timeout(40)
  no_blank();assert abs(page.evaluate('scrollY')-start)<2,'Rolagem do painel não deve ser transferida para o documento'
 visit('2025','2025-joao');page.locator('.historical-workspace').screenshot(path='tmp/history-dates/dates-and-scroll-desktop.png')
 for width in [768,390,320]:
  page.set_viewport_size({'width':width,'height':844});visit('2025','2025-joao');expect(page.locator('.historical-agenda')).to_be_visible();no_blank();assert page.evaluate('document.documentElement.scrollWidth<=innerWidth');start=page.evaluate('scrollY');page.mouse.move(width//2,700);page.mouse.wheel(0,600);page.wait_for_timeout(100);assert page.evaluate('scrollY')>start,'Rolagem natural do celular deve continuar disponível'
 page.add_script_tag(content=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8'));result=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');assert not result['violations'],[v['id'] for v in result['violations']]
 assert not errors,errors;print(json.dumps({'dates_examples':True,'no_blank_page':True,'sidebar_scroll_contained':True,'mobile_scroll_preserved':True,'axe_violations':0}));b.close()

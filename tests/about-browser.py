"""Sobre: conteúdo editorial, navegação, transparência e reflow."""
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import json,re
OUT=Path('tmp/about');OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:5173/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True);c=b.new_context(viewport={'width':1440,'height':1000},locale='pt-BR');page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(BASE+'#/sobre?dia=21');page.wait_for_load_state('networkidle');expect(page.get_by_role('heading',level=1)).to_be_focused();expect(page.get_by_role('heading',level=1)).to_have_text('O festival acontece na cidade.')
 expect(page.locator('.about-pillars>a')).to_have_count(3);expect(page.get_by_role('heading',name='Equipe VivaSE',exact=True)).to_be_visible()
 image=page.locator('.about-masthead img');assert image.evaluate('e=>e.complete && e.naturalWidth>0');expect(page.locator('.about-masthead figcaption')).to_contain_text('Heitor Xavier')
 page.get_by_role('link',name='Fontes e cuidados',exact=True).click();expect(page.locator('#sobre-fontes')).to_be_focused();assert 'dia=21' in page.url and 'secao=fontes' in page.url
 page.get_by_role('button',name='Fontes e créditos',exact=True).click();expect(page.locator('.about-transparency')).to_contain_text('20 espaços ou frentes');expect(page.locator('.about-transparency')).to_contain_text('144 registros')
 page.get_by_role('button',name='Fotografias e contexto das imagens',exact=True).click();expect(page.locator('.about-photo-credits>li')).to_have_count(20)
 page.get_by_role('button',name='Dados no aparelho e sua localização',exact=True).click();expect(page.locator('.about-transparency')).to_contain_text('exportar uma cópia JSON');expect(page.locator('.about-transparency')).to_contain_text('Favoritos da programação')
 page.get_by_role('button',name='Funciona sem internet?',exact=True).click();expect(page.locator('.about-faq')).to_contain_text('Não há modo offline garantido')
 page.get_by_role('button',name='O VivaSE é um canal oficial do FASC?',exact=True).click();expect(page.locator('.about-faq')).to_contain_text('protótipo independente')
 correction=page.get_by_role('link',name='Sugerir uma correção no GitHub',exact=True);assert '/issues/new?' in correction.get_attribute('href');expect(page.locator('.about-contribute')).to_contain_text('A sugestão será pública')
 for a in page.locator('.about-pillars a,.about-pillars>a,.about-finale a').all():assert 'dia=21' in a.get_attribute('href')
 page.get_by_role('link',name='Conhecer os roteiros',exact=False).click();expect(page.locator('.route-choice')).to_have_count(3);assert 'dia=21' in page.url
 page.goto(BASE+'#/sobre?dia=21&secao=perguntas');expect(page.locator('#sobre-perguntas')).to_be_focused()
 page.get_by_role('button',name='Preciso permitir minha localização?',exact=True).focus();page.keyboard.press('Enter');expect(page.get_by_role('button',name='Preciso permitir minha localização?',exact=True)).to_have_attribute('aria-expanded','true')
 checks=['Imagem real e crédito; equipe coletiva sem nomes inventados','Pilares, CTAs e links preservam o dia; âncoras por hash e foco acessível','Fontes e cobertura, 20 créditos e privacidade atualizada; FAQ com teclado','Contribuição abre formulário público do GitHub sem envio automático']
 axe=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8')
 for width in [1440,768,390,320]:
  page.set_viewport_size({'width':width,'height':1000 if width>700 else 844});page.goto(BASE+'#/sobre?dia=21');page.reload();page.wait_for_load_state('networkidle');page.evaluate('document.fonts.ready');assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  page.screenshot(path=str(OUT/(str(width)+'.png')),full_page=True)
  if width in [1440,390]:
   page.locator('.about-team').screenshot(path=str(OUT/(str(width)+'-team.png')))
   for button in page.locator('.about-disclosure>h3>button').all():button.click()
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),('expanded',width)
   page.add_script_tag(content=axe);r=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');assert not r['violations'],(width,[(v['id'],[n['target'] for n in v['nodes']]) for v in r['violations']])
 page.route('**/images/about/praca-sao-francisco-noturna-heitor-xavier.jpg',lambda r:r.abort());page.reload();expect(page.locator('.about-masthead .place-photo-fallback')).to_be_visible();expect(page.locator('.about-masthead a')).to_have_attribute('href',re.compile('https://'))
 assert not errors,errors
 checks+=['1440/768/390/320 sem overflow; acordeões expandidos e axe em desktop/celular; falha de imagem tratada']
 (OUT/'checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(checks,ensure_ascii=False,indent=2));b.close()

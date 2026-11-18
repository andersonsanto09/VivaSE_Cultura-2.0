"""Planejamento, cultura, privacidade e ciclo de vida do aviso do mapa."""
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import json,re
OUT=Path('tmp/planning');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True,args=['--enable-unsafe-swiftshader']);c=b.new_context(viewport={'width':1440,'height':1000},locale='pt-BR',accept_downloads=True)
 c.route('https://api.maptiler.com/**',lambda r:r.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg"/>' ) if '.svg' in r.request.url else r.fulfill(content_type='application/json',body=json.dumps({'version':8,'sources':{},'layers':[]})))
 page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));checks=[]
 def visit(path):
  page.goto('http://127.0.0.1:5173/#/'+path);page.wait_for_load_state('networkidle')
 visit('programacao?dia=21');expect(page.locator('.timeline-row')).to_have_count(51)
 page.get_by_role('button',name='Salvar Morgana na minha programação',exact=True).click();page.reload();expect(page.get_by_role('button',name='Remover Morgana da minha programação',exact=True)).to_have_attribute('aria-pressed','true')
 page.get_by_role('button',name=re.compile('Minha programação ·')).click();expect(page.locator('.timeline-row')).to_have_count(1)
 page.get_by_role('button',name='Por palco ou espaço',exact=True).click();expect(page.locator('.stage-schedule-group')).to_have_count(1)
 page.get_by_role('button',name='Ver atividade: Morgana',exact=True).click();expect(page.get_by_role('dialog')).to_be_visible();expect(page.locator('#activity-title')).to_have_text('Morgana')
 page.keyboard.press('Escape');expect(page.get_by_role('dialog')).to_have_count(0)
 checks.append('Favorito persiste; seleção pessoal, agrupamento e diálogo com Escape')
 visit('programacao?dia=21&periodo=madrugada');assert page.locator('.timeline-row').count()>0
 for el in page.locator('.timeline-time>time').all():assert int(el.get_attribute('datetime')[11:13])<6
 visit('programacao?dia=21&visao=palcos');expect(page.locator('.timeline-row')).to_have_count(51)
 visit('programacao?dia=20&atividade=joao-20-2');expect(page.get_by_role('dialog')).to_be_visible();page.get_by_role('link',name='The Baggios',exact=True).click();expect(page.locator('#artist-detail-title')).to_have_text('The Baggios');expect(page.locator('.artist-chronology>li')).to_have_count(7)
 expect(page.locator('.current-artist-agenda')).to_contain_text('Anunciado no FASC 2026');page.locator('.current-artist-agenda a').click();expect(page.get_by_role('dialog')).to_be_visible();page.keyboard.press('Escape')
 checks.append('Madrugada e 51 atividades agrupadas; perfil histórico ligado ao anúncio de 2026 sem alterar sete registros')
 visit('programacao?dia=20&atividade=joao-20-2');page.evaluate("() => {Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copied=text}}});}")
 page.get_by_role('button',name='Compartilhar atividade',exact=True).click();expect(page.get_by_role('dialog')).to_contain_text('Link da atividade copiado.');assert 'atividade=joao-20-2' in page.evaluate('window.copied') and 'origem=' not in page.evaluate('window.copied')
 page.evaluate("() => {Storage.prototype.setItem=()=>{throw new DOMException('Quota','QuotaExceededError')}}")
 page.get_by_role('button',name='Salvar na minha programação',exact=True).click();expect(page.get_by_role('dialog')).to_contain_text('Não foi possível salvar');expect(page.get_by_role('button',name='Salvar na minha programação',exact=True)).to_have_attribute('aria-pressed','false')
 checks.append('Compartilhamento individual sem contexto privado e falha de quota sem falso favorito');page.reload();page.wait_for_load_state('networkidle')

 visit('cultura?dia=21');expect(page.locator('.culture-path')).to_have_count(3);page.get_by_role('link',name=re.compile('Descobrir a cidade')).click();expect(page.locator('.route-map')).to_be_visible()
 page.get_by_role('button',name='Começar roteiro',exact=True).click();page.get_by_role('button',name='Marcar como visitado',exact=True).first.click();page.reload();expect(page.get_by_role('progressbar',name='Paradas visitadas')).to_have_attribute('value','1')
 visit('roteiros?dia=21&roteiro=musica');expect(page.get_by_role('progressbar')).to_have_attribute('value','0')
 checks.append('Hub Cultura, mapa das paradas e progresso independente por roteiro salvo após recarga')
 visit('memorias?dia=21');page.get_by_role('textbox',name='Seu nome ou apelido').fill('QA Planejamento');page.get_by_role('textbox',name='Sua lembrança').fill('Uma lembrança privada.');page.get_by_role('button',name='Salvar no meu aparelho',exact=True).click()
 before=page.evaluate('JSON.parse(localStorage.getItem("vivase:memories:v1")).memories[0]')
 page.get_by_role('button',name='Editar lembrança de QA Planejamento',exact=True).click();page.get_by_role('textbox',name='Sua lembrança').fill('Uma lembrança editada.');page.get_by_role('button',name='Salvar alterações',exact=True).click();page.reload();expect(page.locator('.is-personal')).to_contain_text('Uma lembrança editada.')
 after=page.evaluate('JSON.parse(localStorage.getItem("vivase:memories:v1")).memories[0]');assert before['id']==after['id'] and before['createdAt']==after['createdAt']
 with page.expect_download() as d:page.get_by_role('button',name='Exportar minhas lembranças (JSON)',exact=True).click()
 exported=json.loads(Path(d.value.path()).read_text(encoding='utf8'));assert exported['memories'][0]['text']=='Uma lembrança editada.' and 'coordinates' not in exported['memories'][0]
 page.get_by_role('button',name='Editar lembrança de QA Planejamento',exact=True).click();page.get_by_role('textbox',name='Sua lembrança').fill('Cancelar rascunho');page.get_by_role('button',name='Cancelar edição',exact=True).click();expect(page.locator('.is-personal')).not_to_contain_text('Cancelar rascunho')
 checks.append('Lembrança editada preserva ID/criação; cancelar não altera; exportação JSON sem posição')
 visit('mapa?dia=21');page.clock.install();page.evaluate("() => {navigator.geolocation.getCurrentPosition=(success)=>success({coords:{latitude:-10.92,longitude:-37.07,accuracy:12}})}")
 page.get_by_role('button',name='Minha localização',exact=True).click();page.get_by_role('button',name='Voltar ao festival',exact=True).click();expect(page.locator('.geo-message')).to_contain_text('Mapa retornou à área do festival.')
 page.clock.fast_forward(7500);expect(page.locator('.geo-message')).to_have_count(0)
 page.get_by_role('button',name='Minha localização',exact=True).click();page.get_by_role('button',name='Fechar aviso de localização',exact=True).click();expect(page.locator('.geo-message')).to_have_count(0)
 checks.append('Aviso de retorno desaparece em sete segundos e pode ser fechado manualmente')
 axe=Path('node_modules/axe-core/axe.min.js').read_text(encoding='utf8')
 for width in [1440,390,320]:
  page.set_viewport_size({'width':width,'height':1000 if width>700 else 844})
  for name,path in [('agenda','programacao?dia=21'),('grouped','programacao?dia=21&visao=palcos'),('dialog','programacao?dia=20&atividade=joao-20-2'),('culture','cultura'),('route','roteiros?roteiro=patrimonio'),('memory','memorias')]:
   visit(path);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,name)
   if width==390:
    page.add_script_tag(content=axe);result=page.evaluate('async()=>await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})');assert not result['violations'],(name,[(v['id'],[n['target'] for n in v['nodes']]) for v in result['violations']]);page.screenshot(path=str(OUT/(name+'.png')),full_page=False)
 checks.append('Seis telas sem overflow em 1440/390/320 e sem violações axe móveis')
 assert not errors,errors
 (OUT/'checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(checks,ensure_ascii=False,indent=2));b.close()

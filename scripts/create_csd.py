from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

root = Path(__file__).resolve().parents[1]
out = root / 'output' / 'pdf'
out.mkdir(parents=True, exist_ok=True)
path = out / 'VivaSE-Matriz-CSD.pdf'
c = canvas.Canvas(str(path), pagesize=landscape(A4))
c.setTitle('VivaSE Cultura | Matriz CSD')
c.setAuthor('VivaSE Cultura')
w, h = landscape(A4)
c.setFillColor(HexColor('#F4F5F0')); c.rect(0, 0, w, h, fill=1, stroke=0)
c.setFillColor(HexColor('#1E514A')); c.setFont('Helvetica-Bold', 12)
c.drawString(36, h-40, 'VivaSE Cultura / Ideathon')
c.setFillColor(HexColor('#182D29')); c.setFont('Helvetica-Bold', 30)
c.drawString(36, h-83, 'Matriz CSD')
c.setFont('Helvetica', 11); c.setFillColor(HexColor('#4B5D57'))
c.drawString(36, h-108, 'Mapeamento de problemas | Design Sprint | Versão inicial - 16/11/2026')
c.drawString(36, h-132, 'Desafio: ajudar turistas que não conhecem São Cristóvão a se orientar durante o FASC.')
columns = [
 ('C', 'Certezas', 'O que já sabemos', [
  'O projeto terá um protótipo para apresentação.',
  'O público prioritário escolhido pela equipe são turistas que não conhecem São Cristóvão.',
  'A equipe possui um conceito anterior, prints e pitch.',
  'Há programação oficial e fontes históricas disponíveis para pesquisa.']),
 ('S', 'Suposições', 'O que precisamos validar', [
  'Turistas têm dificuldade para encontrar palcos e serviços durante o FASC.',
  'Um mapa com localização e programação ajudaria na orientação.',
  'História, memórias e roteiros podem enriquecer a visita.',
  'Uma área administrativa seria útil para a organização.']),
 ('D', 'Dúvidas', 'O que precisamos descobrir', [
  'Quais dificuldades são mais frequentes para os visitantes?',
  'Como os turistas se orientam atualmente?',
  'A conexão de internet permite usar o mapa durante o festival?',
  'Quem forneceria e atualizaria as informações?'])]
gap = 14; cw = (w-72-2*gap)/3; top = h-159; bottom = 103
style = ParagraphStyle('body', fontName='Helvetica', fontSize=11, leading=16, textColor=HexColor('#263D36'))
for i, (letter, title, sub, rows) in enumerate(columns):
 x = 36+i*(cw+gap)
 c.setFillColor(HexColor('#FFFFFF')); c.roundRect(x, bottom, cw, top-bottom, 8, fill=1, stroke=0)
 c.setFillColor(HexColor('#1E514A')); c.setFont('Helvetica-Bold', 12); c.drawString(x+18, top-28, letter)
 c.setFont('Helvetica-Bold', 19); c.drawString(x+18, top-57, title)
 c.setFillColor(HexColor('#53675F')); c.setFont('Helvetica', 10); c.drawString(x+18, top-77, sub)
 y = top-101
 for row in rows:
  p = Paragraph(row, style); _, ph = p.wrap(cw-36, 200)
  p.drawOn(c, x+18, y-ph); y -= ph+18
  if y < bottom+8: raise RuntimeError('Conteúdo excede a coluna')
c.setFillColor(HexColor('#1E514A')); c.setFont('Helvetica-Bold', 10)
c.drawString(36, 77, 'Como usar')
p = Paragraph('Validar as suposições com entrevistas, observação e relatos documentados. Escolher o público é uma decisão da equipe; as dificuldades desse público ainda precisam de evidências.', ParagraphStyle('note', parent=style, fontSize=10, leading=14))
_, ph = p.wrap(w-72, 50); p.drawOn(c, 36, 64-ph)
c.setFont('Helvetica', 9); c.setFillColor(HexColor('#53675F')); c.drawString(36, 22, 'Base: alinhamento da equipe nesta conversa. Matriz inicial, sujeita a revisão após pesquisa com visitantes.')
c.drawRightString(w-36, 22, '1 / 1'); c.save()
print(path)

"""Verify that the actual presentation support works without internet."""
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
with sync_playwright() as p:
 b=p.chromium.launch(channel='msedge',headless=True)
 c=b.new_context(offline=True,viewport={'width':1440,'height':1000});page=c.new_page();external=[]
 page.on('request',lambda r:external.append(r.url) if r.url.startswith(('http:','https:')) else None)
 page.goto((Path('docs/apresentacao/index.html').resolve()).as_uri())
 for index in range(6):
  expect(page.locator('figure:visible')).to_have_count(1)
  expect(page.locator('#count')).to_have_text(f'{index+1} / 6')
  assert page.locator('figure:visible img').evaluate('(e)=>e.complete && e.naturalWidth===1440')
  if index<5:page.keyboard.press('ArrowRight')
 expect(page.locator('#next')).to_be_disabled()
 page.keyboard.press('ArrowLeft');expect(page.locator('#count')).to_have_text('5 / 6')
 page.screenshot(path='tmp/phase-5/apoio-local.png')
 page.emulate_media(media='print');expect(page.locator('figure:visible')).to_have_count(6)
 assert not external,external
 print('6 capturas reais carregadas offline; setas, limites e impressão aprovados; nenhuma requisição HTTP.')
 b.close()

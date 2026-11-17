# 20 — Visão geral do mapa e proposta fotográfica

Revisão de 17/11/2026, após retorno do responsável sobre a versão implementada.

## Correção do zoom

O afastamento radial fixo em pixels resolvia a redistribuição brusca, mas criava outro problema: ao afastar o zoom, a mesma quantidade de pixels representava uma distância muito maior no terreno. Pins de uma mesma praça pareciam distribuídos pela cidade.

As referências e os grupos continuam determinísticos. A separação visual agora acompanha continuamente a escala do mapa abaixo do zoom 16,5 e fica limitada ao afastamento original acima dele. A ligação tracejada e a seleção de vizinhos usam o mesmo deslocamento exibido. Nenhuma coordenada do catálogo foi alterada e não há clustering.

Na visão geral, espaços próximos podem se sobrepor por compartilharem a mesma referência; a seleção de vizinhos permanece disponível. Isso evita inventar distribuição geográfica apenas para afastar os ícones.

Verificações:

- Dez testes de domínio aprovados, incluindo proximidade à referência na visão geral.
- Regressão em 1.133 quadros, percorrendo roda e controles até o zoom mínimo.
- Variação máxima em relação à separação esperada: 1,277 px; tolerância de arredondamento/eventos: 3,5 px.
- Afastamento máximo medido na visão geral: 2,308 px.
- Teclado da legenda e preservação de perspectiva no redimensionamento mantidos.
- Captura com cartografia real: `tmp/zoom-overview/map-overview-fixed.png`.

## Fotografia aplicada à Home

Após a prévia e o retorno do responsável, a fotografia foi aplicada à Home do protótipo em 17/11/2026. O arquivo é servido localmente em `public/images/fasc-2025-palco-julia-rodrigues.jpg`, com edição e crédito visíveis e link à fonte. A identidade de cores e a logo FASC 2026 permanecem.

Fonte: [Prefeitura de São Cristóvão, primeira noite de shows do FASC 2025](https://www.saocristovao.se.gov.br/noticia/primeira-noite-de-shows-do-fasc-2025-e-marcada-por-sucesso-de-publico-e-representatividade-negra-nos-palcos).

Crédito informado na publicação: Julia Rodrigues. Imagem de 1.600 × 1.066 pixels. A prévia identifica explicitamente a edição anterior e o crédito; o amarelo, o roxo, a logo e a composição aprovada permanecem.

Prévia local: `tmp/zoom-overview/home-photo-proposal.png`. A publicação consultada é a fonte da fotografia; não foi afirmada licença de reutilização a partir da mera disponibilidade pública.

## Próximo passo autorizado condicionalmente

O responsável pediu commit, push e GitHub Pages **após aprovar a versão**. Nenhuma dessas ações foi executada nesta revisão. O aceite continua pendente.

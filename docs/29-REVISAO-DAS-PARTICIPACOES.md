# 29 — Revisão da realização das participações históricas

Revisão de 18/11/2026 após o responsável apontar João Gomes e Pabllo Vittar como exemplos de shows realizados que ainda estavam identificados apenas por anúncios.

## Correção

Foram conferidas coberturas posteriores aos eventos e retrospectivas institucionais. **47 registros passaram a participação documentada**, preservando seus IDs, vínculos e fontes anteriores. A fonte que documenta a realização aparece primeiro. Não foi aplicado o critério automático “o ano passou, então o show aconteceu”.

Entre os nomes corrigidos estão João Gomes, Pabllo Vittar, Seu Jorge, Marcelo D2, Dead Fish, Mundo Livre S/A, Os Garotin, Saulo Fernandes, Lia de Itamaracá, Liniker, Djonga, Pato Fu, Daniela Mercury e MC Tha. Há revisões de participações de 2017, 2018, 2019, 2022, 2023, 2024 e 2025.

- [Pabllo Vittar: cobertura da segunda noite de 2025](https://www.saocristovao.se.gov.br/noticia/sucesso-de-publico-e-diversidade-de-ritmos-marcam-a-segunda-noite-de-shows-do-fasc-2025).
- [João Gomes: cobertura da terceira noite de 2025](https://www.saocristovao.se.gov.br/index.php/noticia/terceira-noite-de-fasc-tem-recorde-de-publico-com-a-uniao-de-artistas-nacionais-e-regionais).
- As demais fontes, nomes, edições e registros revisados estão no [inventário desta revisão](fontes/revisao-status-participacoes-2026-11-18.json).

## Substituição documentada

A revisão também encontrou [a notícia da substituição de Itamar Vieira Jr. por Socorro Acioli em 2024](https://www.saocristovao.se.gov.br/noticia/socorro-acioli-substitui-itamar-vieira-jr-no-39o-festival-de-artes-de-sao-cristovao). Esse registro recebe status próprio de **participação substituída**, preservando o anúncio original no histórico, sem tratá-lo como apresentação realizada.

## Fonte disponível não é o mesmo que presença ou ausência

Dos 146 registros antes identificados apenas como anúncios, 47 receberam confirmação de realização e um recebeu confirmação de substituição. Os **98 restantes ainda se apoiam em registros de programação neste recorte**; a revisão não afirma que esses artistas deixaram de se apresentar. O selo agora diz **Registro de programação**, com explicação dessa diferença nas trajetórias e fontes.

A camada de revisão é separada dos arquivos recebidos. Conserva os 230 registros, os 191 artistas e as 18 edições. Não duplica participações, inventa apresentações, completa posições de palco ou transforma horários divulgados em horários efetivos. A programação de 2026, ainda futura na data desta revisão, continua anunciada e separada do acervo histórico.

O resumo das edições revisadas também foi atualizado para não continuar descrevendo seu acervo inteiro como apenas anúncios.

## Verificação

38 testes de domínio aprovados, incluindo a realização de João Gomes/Pabllo, vínculos de fontes, integridade do acervo, preservação de horário anunciado e dados originais, rejeição de revisões sem registro/fonte e distinção da substituição. `tests/history-status-browser.py` verifica lista e trajetória, prioridade de cobertura, explicações, sete participações de The Baggios, anúncio atual de 2026, reflow móvel e axe. Build de produção e regressão da máquina do tempo/acervo conferidos.

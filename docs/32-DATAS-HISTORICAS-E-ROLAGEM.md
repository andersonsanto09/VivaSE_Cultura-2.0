# Datas históricas e rolagem — 18/11/2026

## Resultado da revisão

Foram preenchidas **156 datas** que estavam ausentes. O catálogo conserva suas 230 participações: **188 agora têm dia identificado e 42 continuam sem dia individual confirmado**. Todas as participações cadastradas de 2005 e de 2017 a 2025 passaram a ter data.

No exemplo apresentado pelo usuário:

| Artista | Dia de programação de 2025 | Horário anunciado |
| --- | --- | --- |
| Pabllo Vittar | 21/11 | 22h |
| Marcelo D2 | 21/11 | 00h, madrugada seguinte |
| João Gomes | 22/11 | 22h |

A programação histórica distingue o dia do festival da data civil. Um anúncio para meia-noite de sexta-feira não vira automaticamente um show à meia-noite civil da própria sexta-feira. Horários de programação continuam anunciados, preservando a distinção em relação ao início efetivo do espetáculo.

## Fontes e critérios

Foram confrontados programas oficiais de 2024 e 2025, matérias da Prefeitura de São Cristóvão, publicações da UFS, a programação de 2005 reproduzida pela Infonet, divulgações das edições de 2017–2023 e a dissertação de Mislene Vieira dos Santos, *Da ditadura à democracia: o Festival de Arte de São Cristóvão (FASC) e a política cultural sergipana (1972–1995)*, UFS, 2014.

Os registros de Sivuca em 1984 e Olodum em 1988 foram datados pela relação explícita da apresentação com a abertura, cruzada com o calendário da respectiva edição na dissertação. A data de publicação de uma notícia não foi usada como data do show.

Cada revisão guarda ID da participação, data, natureza da data, fontes e evidência. A pesquisa recebida foi preservada; IDs, status, coordenadas e quantidade de participações permanecem iguais. Observações antigas que contradiziam as datas agora confirmadas foram atualizadas, preservando as divergências pertinentes.

Duas situações exigem ressalva:

- **Embrazados Crew em 2025:** a data 20/11 está confirmada, mas PDF e matéria oficial divergem entre 18h e 18h30. O horário não foi preenchido arbitrariamente.
- **Cármen Lúcia em 2025:** a matéria oficial anuncia vídeo-palestra em 21/11 às 16h; o PDF posterior não a inclui. A data representa esse anúncio, com a divergência indicada. O status não foi convertido em apresentação realizada nem presença física.

A participação de Luiza Romão já vinculada à cobertura de domingo foi datada como a Roda Fasc de Poesia de 23/11. A mesa de sábado é outra atividade; não foi usada para trocar a identidade desse registro.

## Pendências que não foram inventadas

As 42 participações sem dia confirmado estão distribuídas por 1972 (9), 1985 (2), 1988 (7), 1989 (1), 1990 (5), 1991 (2), 1993 (3) e registros sem ano identificado (13). A dissertação e as retrospectivas informam anos ou períodos gerais para esses casos, sem individualizar o dia de cada apresentação. O jornal digital de 1972 não pôde ser recuperado integralmente nesta consulta devido a respostas de erro do servidor.

Os nomes, fontes e motivos de pendência constam do [inventário completo](fontes/revisao-datas-historicas-2026-11-18.json). Um período de festival não foi apresentado como dia individual do artista. Esses registros continuam disponíveis e sinalizados no acervo.

## Bug do vídeo

O problema foi reproduzido na rolagem da agenda: elementos de texto destinados a leitores de tela, posicionados de forma absoluta, escapavam do contexto do painel e ampliavam a altura do documento. No cenário testado em 1920 × 1080, o conteúdo terminava próximo de 1063 px, mas o documento chegava a 2020 px. Ao alcançar o final da lista, a rolagem passava ao documento e revelava a área branca.

O painel agora estabelece seu próprio contexto de posicionamento e contém a transferência de rolagem no computador. Foi removida também a declaração de altura que sobrescrevia o layout fluido entre 701 e 800 px. No celular, a rolagem natural da página foi preservada. O mesmo cenário passou a manter a altura do documento em 1080 px, sem rolar para fora do conteúdo.

## Verificação

- 42 testes do domínio: datas válidas, fontes existentes, preservação dos dados, madrugada e divergências.
- Regressão do vídeo com rolagem repetida até o final do painel, inclusive registros antigos ainda sem data.
- Datas e horários dos exemplos, filtros, detalhes, fontes e retorno ao mapa.
- Regressão das 18 edições e do fluxo histórico.
- Reflow em desktop, tablet e celular, rolagem móvel e verificação com axe.
- Build de produção.

Testes: `tests/history-dates.test.ts`, `tests/history-dates-scroll.py`, `tests/history-map-agenda.py` e `tests/history-browser.py`.

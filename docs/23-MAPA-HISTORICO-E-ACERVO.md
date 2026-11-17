# 23 — Mapa histórico interativo e acervo do FASC

Revisão: 17/11/2026. Expansão funcional implementada no projeto real, com React, TypeScript, MapLibre/react-map-gl, Radix e CSS existentes. Nenhuma biblioteca nova, backend ou banco de dados foi introduzido. Versão local para avaliação; sem commit/push ou nova publicação neste incremento.

## Resultado e como usar

1. Abra o Mapa e selecione **Explorar a história**. O mapa de 2026 continua separado e preserva seus filtros e dia ao alternar pelos controles do modo.
2. No mapa histórico, use os anos, o controle deslizante, Edição anterior e Próxima edição. A faixa inferior representa somente as nove edições cadastradas, não todos os anos de existência do festival.
3. **Reproduzir** começa na edição selecionada e avança a cada 4,5 segundos. Na última edição, para e oferece **Reiniciar**, que volta a 1972. Pausar, escolher uma edição, abrir um espaço ou sair do modo interrompe a sequência; aba oculta e navegação pelo histórico também pausam. O efeito limpa o timer ao trocar de estado ou desmontar.
4. A câmera permanece estável entre edições. **Ver todos** enquadra explicitamente as referências disponíveis. A base cartográfica é atual, não um mapa antigo nem uma reconstrução da estrutura histórica.
5. Clique num pin ou num espaço da lista para consultar o nome usado naquela edição, participações, datas disponíveis, contexto e fontes. Fotografias já identificadas são reaproveitadas somente em edições correspondentes.
6. Em **Cultura → Linha do tempo**, abra “Por dentro desse encontro”, filtre por edição e siga “Explorar esta edição no mapa”. Artistas relacionados abrem seus registros.
7. Em **Cultura → Artistas**, busque por nome, escolha edição/categoria/ordenação e navegue pelas páginas de 12 cards. O detalhe reúne participações do mesmo artista em diferentes anos. “Ver no mapa” existe somente quando a participação tem espaço com coordenadas documentadas. O retorno conserva a exploração de origem.

No celular, Mapa/Espaços e registros alternam a área principal. A cartografia tem pelo menos 360 CSS px de altura; a faixa de edições rola horizontalmente. A seleção possui feedback de cor, os pins têm entrada discreta por opacidade e os cards têm hover leve. O teclado não dispara a animação dos pins, e movimento reduzido desativa os efeitos. Não há animação de coordenadas nem reposicionamento da câmera a cada tick.

## Cobertura cadastrada

Todos os recortes são parciais. A quantidade de pins descreve referências geográficas atuais dos locais documentados para a época; nenhuma delas é certificada como posição exata da estrutura ou entrada histórica.

| Ano | Edição | Espaços cadastrados | Pins | Participações | Evidência principal |
| --- | --- | ---: | ---: | ---: | --- |
| 1972 | 1ª | 0 | 0 | 0 | UFS: retrospecto da criação |
| 2005 | Número não confirmado | 0 | 0 | 0 | UFS: edição anterior à pausa |
| 2017 | 34ª | 2 | 1 | 2 | UFS: anúncio da retomada/abertura |
| 2018 | 35ª | 2 | 2 | 2 | UFS: programação; Prefeitura: retrospecto de BaianaSystem |
| 2019 | 36ª | 0 | 0 | 2 | UFS: artistas anunciados, palcos não identificados no recorte |
| 2022 | 37ª | 2 | 2 | 8 | Prefeitura: cobertura da abertura e literatura, com anúncios posteriores separados |
| 2023 | 38ª | 3 | 3 | 6 | Prefeitura: encerramento, Capuchinhos e balanço |
| 2024 | 39ª | 3 | 3 | 12 | Prefeitura: segundo dia e Samba na Bica |
| 2025 | 40ª | 2 | 2 | 6 | Prefeitura: primeira noite |

Totais: **9 edições, 14 registros de espaços vinculados a edições, 13 referências com coordenadas, 36 artistas/grupos, 38 participações, 16 fontes históricas com URL e 15 marcos culturais**. A linha do tempo anterior tinha 8 marcos: foram acrescentados 7 e os anteriores receberam contexto expandido e integração. Os 15 marcos também incluem o patrimônio da cidade em 2010 e a edição futura de 2026; esses dois anos não entram no seletor de edições passadas.

Das 38 participações, **31 possuem cobertura ou relato retrospectivo de realização e 7 são anúncios cuja realização não foi comprovada neste recorte**. A interface distingue os dois tipos. Nenhum artista foi cadastrado somente por ser famoso ou por aparecer num depoimento fictício do protótipo antigo.

## Artistas e participações

| Ano | Participações documentadas | Somente anunciadas nas fontes consultadas |
| --- | --- | --- |
| 2017 | — | Grupo Imbuaça; Orquestra Sinfônica de Sergipe |
| 2018 | BaianaSystem, confirmada retrospectivamente na cobertura de 2024 | Pedro Bomba |
| 2019 | — | Gilberto Gil; Liniker |
| 2022 | Afoxé di Preto; Companhia de Teatro Voz da Vida; Espaço Formas; Samba das Pretas; Chiko Queiroga e Antônio Rogério; Galdência Ferreira | Alceu Valença; The Baggios |
| 2023 | Joésia Ramos; Zeca Baleiro; Groundation; Nona; Fulgêncios; Pérola | — |
| 2024 | Serigy All-Star; Marina Lima; BaianaSystem; Mestre Saci; The Baggios; Nine Senses; Filipe Catto; Lamparina; Iggo Centaura; Descidão dos Quilombolas; Samba Nuaá; Trakinagem | — |
| 2025 | Santa Cena; Joyce Alane; Olodum; Gaby Amarantos; Karol Conká; Edcity | — |

A ausência de comprovação neste recorte não significa cancelamento ou ausência real; significa que a fonte cadastrada não comprova execução. O Palco Gal Costa de 2022 não foi convertido em participação da cantora: seu nome no espaço é tratado como denominação daquele período.

## Locais identificados e precisão

- **2017:** Palco João Bebe-Água, Praça São Francisco. “Museu de Sergipe”, nome usado pela fonte para exposições anunciadas, permanece sem pin por falta de identificação suficiente do equipamento.
- **2018:** Palco Frei Santa Cecília, Praça do Carmo; Salão de Literatura José Augusto Garcez, Largo da Matriz. O salão usa a referência do largo, não uma suposição sobre o prédio nem a Escola Gina Franco atual.
- **2022:** Palco Gal Costa, Praça São Francisco; Salão de Literatura Manoel Ferreira, Escola Gina Franco.
- **2023:** João Bebe Água, Praça São Francisco; Capuchinhos, Praça da Bandeira; Samba na Bica, Bica dos Pintos.
- **2024:** João Bebe Água, Praça São Francisco; Frei Santa Cecília, Praça do Carmo; Samba na Bica, Bica dos Pintos.
- **2025:** João Bebe Água, Praça São Francisco; Frei Santa Cecília, Praça do Carmo.

As coordenadas vêm das referências já levantadas em `src/data/locations.ts` (OSM/UNESCO e link da Bica confirmado pelo responsável), somente quando a fonte histórica nomeia a mesma praça/equipamento. A associação histórica tem sua própria fonte, separada da fonte geográfica. Todas são marcadas como aproximadas. Não há coordenadas geradas por distribuição arbitrária nem pin de artista cujo palco seja desconhecido.

## Lacunas e divergências preservadas

- Os anos entre 1972 e 2005 ainda carecem de curadoria detalhada; sua ausência neste seletor não significa que não ocorreram edições.
- 1972 e 2005 têm confirmação geral, sem programação detalhada ou locais georreferenciados neste recorte. O número de 2005 não foi deduzido de 2017.
- Imbuaça/ORSSE em 2017, BaianaSystem em 2018 e Gil/Liniker em 2019 não têm palco atribuído. BaianaSystem de 2018 também permanece sem data exata.
- Parte dos registros não possui horário. Datas rotuladas como **dia de programação** não são apresentadas como horário civil de início de um show de madrugada. O anúncio de The Baggios às 01h, na programação de 02/12/2022, recebe a data civil 03/12/2022 explicitamente.
- A cobertura da Bica alterna as grafias Samba Nuaá e Samba de Nuaá; o registro segue o nome na abertura do texto e explicita a variação.
- A reportagem de 2024 trata do segundo dia, mas chama o show de Lamparina de “última noite”; o registro conserva a apresentação e o palco documentados sem atribuir data exata. A nota aparece no registro e na fonte.
- Notícias da UFS de 2018/2019 mencionam cerca de 30 anos de pausa; as fontes específicas da retomada registram 2005–2017, doze anos. O acervo não reproduz a duração de 30 anos, e a divergência fica documentada.
- A fonte de 2022 inclui cobertura de 01/12 e agenda dos dias seguintes. Essa agenda não foi tratada como prova de shows realizados.
- 2020/2021 não foram criados como edições vazias para preencher o seletor. 2010 é patrimônio da cidade; 2026 permanece edição anunciada no mapa atual.

## Fontes da pesquisa

O registro tipado em `src/data/history.ts` guarda URLs, classificação de evidência, notas e datas de publicação quando registradas. Cada apresentação e espaço aponta para os IDs das fontes, que aparecem na interface. Não há conteúdo histórico extenso embutido em JSX.

Fontes institucionais centrais:

- [UFS — abertura e história do FASC, 2017](https://www.ufs.br/conteudo/60741-abertura-do-festival-de-artes-de-sao-cristovao-acontece-nesta-sexta) e [A volta do FASC](https://www.ufs.br/conteudo/60725-a-volta-do-fasc).
- [UFS — programação da 35ª edição](https://www.ufs.br/conteudo/62420-prefeitura-de-sao-cristovao-lanca-programacao-do-35-fasc) e [programação da 36ª edição](https://www.ufs.br/conteudo/64406-programacao-do-festival-de-artes-de-sao-cristovao-comeca-nesta-quinta-feira-e-segue-ate-domingo).
- [Prefeitura — cobertura da abertura no Palco Gal Costa](https://www.saocristovao.se.gov.br/noticia/palco-gal-costa-recebe-artistas-sergipanos-e-atrai-grande-publico-a-praca-sao-francisco-na-abertura-do-fasc), [salões em 2022](https://www.saocristovao.se.gov.br/noticia/saloes-de-artes-e-literatura-promoveram-rodas-de-conversa-no-1o-dia-do-fasc) e [UFS — documentário](https://www.ufs.br/conteudo/70837-ufs-prestigia-lancamento-de-documentario-ato-de-resistencia-50-anos-do-fasc).
- [Prefeitura — encerramento de 2023](https://www.saocristovao.se.gov.br/noticia/deixou-saudades-ultimo-dia-do-fasc-no-palco-joao-bebe-agua-conta-com-artistas-locais-atracao-nacional-e-banda-internacional), [Capuchinhos](https://www.saocristovao.se.gov.br/noticia/mistura-de-ritmos-atrai-grande-publico-ao-palco-dos-capuchinhos-no-segundo-dia-do-fasc), [balanço da edição](https://www.saocristovao.se.gov.br/noticia/fasc-2023-chega-ao-fim-com-sucesso-de-publico-e-sem-registro-de-ocorrencias) e [reconhecimento cultural](https://www.saocristovao.se.gov.br/noticia/festival-de-artes-de-sao-cristovao-se-torna-bem-de-interesse-cultural).
- [Prefeitura — segundo dia de 2024](https://www.saocristovao.se.gov.br/noticia/fasc-2024-diversidade-musical-e-grande-publico-marcam-o-segundo-dia-de-apresentacoes-nos-palcos-joao-bebe-agua-e-frei-santa-cecilia), [Samba na Bica](https://www.saocristovao.se.gov.br/noticia/o-festival-de-artes-de-sao-cristovao-da-a-largada-na-sua-39a-edicao-com-o-samba-na-bica) e [abertura oficial](https://www.saocristovao.se.gov.br/noticia/abertura-oficial-do-fasc-2024-e-marcada-por-homenagens-e-discurso-sobre-liberdade-e-democracia).
- [Prefeitura — primeira noite de 2025](https://www.saocristovao.se.gov.br/noticia/primeira-noite-de-shows-do-fasc-2025-e-marcada-por-sucesso-de-publico-e-representatividade-negra-nos-palcos).
- [UNESCO — Praça São Francisco](https://whc.unesco.org/en/list/1272/), para o marco da cidade.

São recortes institucionais consultados, não uma investigação exaustiva de livros e arquivos. Teses, livros e periódicos localizados em buscas não são apresentados como integralmente lidos. Ampliação das primeiras décadas depende dessa curadoria adicional.

## Arquitetura e arquivos

Inspeção inicial: `MapView` já recebe `Place[]`, separa pins de referências compartilhadas e usa MapLibre/react-map-gl. O catálogo atual distingue coordenadas/precisão de agenda. `App` usa rotas por hash com dia/busca/categoria/origem; Cultura já agrupa roteiros, memórias e marcos. A implementação reaproveita essa organização.

Criados nesta expansão:

- `src/domain/history.ts`: entidades tipadas, adaptação de espaços para o mapa, filtros/ordenação e navegação.
- `src/data/history.ts`: fonte única das edições, espaços, artistas, participações e marcos.
- `src/data/cultural-sources.ts`: fontes culturais comuns, extraídas para evitar ciclo de dependências.
- `src/features/HistoricalMap.tsx`: modo histórico, controles, painel, seleção e ciclo da reprodução.
- `src/features/HistoricalArtists.tsx`: busca, filtros, paginação, detalhe e retorno.
- `src/features/HistoryTimeline.tsx`: marcos expandidos e integração.
- `src/components/HistoricalSources.tsx`, `HistoricalPerformance.tsx` e `MapBoundary.tsx`: apresentação reutilizável de evidências e fallback compartilhado.
- `src/history.css`: composição, estados e responsividade usando os tokens existentes.
- `tests/history.test.ts` e `tests/history-browser.py`: domínio e jornadas históricas.

Modificados: `src/App.tsx`, `src/features/CultureView.tsx`, `src/features/MapView.tsx`, `src/components/PlaceSymbol.tsx`, `src/data/culture.ts`, `src/main.tsx`, `package.json`, `tests/culture.test.ts`, `tests/phase-4.py`, README, roadmap, índice e checklist. O catálogo e a agenda de 2026 não foram substituídos. `MapView` ganhou preservação de câmera opcional; o comportamento padrão do modo atual foi mantido.

## Validação

- **23 testes de domínio aprovados**, incluindo integridade das relações, fontes, interrupções, precisão, nomes por edição, anúncios, divergências, busca e ordenação.
- `tests/history-browser.py` aprovado: nove configurações de pins; câmera preservada; painel; Play/Pause com relógio controlado; fim/reinício; seleção manual por teclado; trocas rápidas; limpeza ao sair; artista → palco → retorno; filtros e paginação; marcos → mapa; parâmetros inválidos; reflow em 1440/768/390/320 px; movimento reduzido e axe em quatro telas móveis, sem violações detectadas nos critérios executados.
- `tests/phase-4.py`, `tests/browser.py` e `tests/phase-3.py` aprovados: persistência local, rotas culturais e orientação de 2026, teclado/foco, agenda, GPS e fallbacks.
- `tests/map-stability.py` aprovado: 1.103 quadros, desvio máximo de 2,533 px dentro da tolerância de 3,5 px; preservação de perspectiva ao redimensionar e legenda por teclado.
- MapTiler real em desktop/mobile: 25 respostas HTTP 200 observadas, dois pins de 2025 e nenhum erro de página nessa conferência. Os testes funcionais maiores usam cartografia simulada, sem confundi-la com o teste real.
- TypeScript e build de produção aprovados. O aviso pré-existente de tamanho do módulo do mapa continua; ele é carregado sob demanda.
- Capturas e evidências locais em `tmp/history/`, fora do Git. O teste físico anterior da fase 3 não vale como aceite destas novas funções.

## Situação do projeto e próximos trabalhos

A expansão histórica está implementada e validada localmente no recorte acima; a pesquisa não cobre todas as edições existentes. Faltam avaliação do responsável, teste físico dos novos fluxos e publicação da versão aprovada. As nove fotografias pendentes do escopo anterior da fase 4 continuam registradas no documento 22; esta expansão não as transforma em concluídas.

Melhorias futuras: curadoria das primeiras décadas em catálogos/jornais/acervos acadêmicos; ampliação de fontes independentes e provas pós-evento; datas/horários ausentes; documentação de mais linguagens e espaços; imagens históricas adicionais com condições de uso confirmadas. Depois do aceite, seguir a revisão final e o roteiro de pitch da fase 5.

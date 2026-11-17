# 24 — Pesquisa integrada, máquina do tempo e fotografias

Revisão de 17/11/2026. Amplia o snapshot inicial do documento 23. O responsável autorizou commit, push e publicação desta revisão; aceite das novas telas e encerramento da fase 4 continuam separados da publicação.

## Resultado

A máquina do tempo fica permanentemente acima do mapa atual e do histórico. Os pontos selecionam 18 edições históricas; o último retorna à programação de 2026, preservando dia, busca e categoria. Reprodução a cada 4,5 segundos, pausa por seleção manual, saída da página e ocultação da janela. A reprodução termina em 2025, sem tratar a edição futura de 2026 como realizada.

O acervo completo mantém 191 artistas/grupos. A vitrine apresenta uma seleção editorial de 80 referências nacionais, internacionais e sergipanas, incluindo música, artes cênicas e literatura. A seleção não apaga o restante do acervo e não é um ranking de valor artístico. Nomes sem edição identificada ficam sem ano inventado; anúncios e convites não viram participações realizadas por inferência.

O detalhe do artista apresenta uma trajetória vertical por edição, palco, natureza da evidência e fontes recolhíveis. As duas atividades de Arnaldo Antunes em 2024 — música e literatura — permanecem separadas. Liniker e o crédito histórico “Liniker e os Caramelows” compartilham identidade, preservando o crédito da fonte quando disponível; a dupla Chiko Queiroga/Antônio Rogério não é confundida com Chico Queiroga solo.

## Merge e rastreabilidade

Os seis arquivos recebidos foram preservados integralmente em `docs/fontes/pesquisa-recebida/`. O consolidado é a entrada principal; os outros cinco são referências e versões anteriores, não lotes adicionados novamente.

- 212 entradas recebidas, todas representadas uma única vez por seu identificador de procedência.
- 21 entradas reconciliadas com registros existentes e 191 acrescentadas.
- Os 38 registros anteriores conservados, com seus identificadores, datas, horários e evidências mais fortes.
- Um registro suplementar pesquisado: The Baggios em 2025, na programação oficial, página 13.
- Total após o merge: 230 registros. A soma inclui anúncios, convites e citações sem ano; não equivale a 230 apresentações comprovadas.
- 18 edições cadastradas e 125 registros de espaços por edição. Isso não significa 125 endereços físicos distintos.

Deduplicação considera identidade, edição, linguagem e espaço. Não reúne duas atividades distintas apenas porque o artista e o ano coincidem. Fontes equivalentes com `/index.php/` ou variação de protocolo são reconciliadas; os arquivos originais permanecem intactos.

O script `scripts/prepare-history-research.py` registra a preparação local feita a partir de `D:/downloads` e do corpus temporário de consultas. A execução normal e o build usam o JSON preparado e versionado, sem depender desse cache ou dos arquivos em Downloads. `edition-index.json` mantém apenas o índice leve dos anos para a Home/mapa atual; o acervo completo continua carregado sob demanda.

## Conferência das fontes e limites

A auditoria inicial percorreu 37 URLs indicadas no consolidado: 27 documentos foram recuperados. A busca encontrou o nome em 113 das 212 entradas nas fontes indicadas. Isso é uma triagem, **não prova automática de ano, palco, execução ou presença física**. Referências inacessíveis e conferências individuais pendentes continuam explícitas nos registros. Fontes complementares foram lidas para os casos abaixo; não foi alegada leitura integral de livros/dissertações nem validação individual completa de todos os nomes.

Casos conferidos contextualmente:

- UFS, programação de 2018: The Baggios no João Bebe-Água; Palco Antônio Mariano na **Praça da Bíblia**, distinto do salão literário no Largo da Matriz.
- Programação completa de 2019 publicada pela Infonet: Baggios no João Bebe-Água. Fonte alternativa associada ao registro, mantendo o status de anúncio.
- Cobertura municipal de 03/12/2022: Alceu Valença e The Baggios efetivamente se apresentaram no Gal Costa. Horários anteriormente cadastrados continuam identificados como **anunciados**, sem inferir início efetivo do show.
- Cobertura municipal da primeira noite de 2023: Baggios no Frei Santa Cecília, agora identificado como documentado.
- PDF oficial de 2025, página 13, **conferido visualmente**: The Baggios às 18h de 22/11 na coluna **Banco do Nordeste Cultural / Praça da Bandeira**. A extração linear do PDF mistura colunas; não foi atribuído ao Frei Santa Cecília. Esse anúncio suplementa as seis edições do exemplo enviado pelo responsável.
- Dissertação de Mislene Vieira Santos/UFS: trechos relevantes de Sivuca, artistas dos anos 1980/1990 e convites foram consultados. Convite não equivale a execução.
- IPHAN: nomes retrospectivos sem edição individual ficam sem ano. Não se atribui 1973 a Jorge Amado nem 1992 a Waly Salomão a partir de referência indireta/convite.
- Elba Ramalho em 1988 (cancelamento) e Gal Costa em 2022 (homenagem no nome do palco) não foram convertidas em apresentações.
- A referência do Overmundo à 33ª edição tem data de publicação em 2006, enquanto o programa e as datas remetem a dezembro de 2005. O cruzamento foi registrado sem esconder a diferença de metadados.

O arquivo original de 1972 e algumas páginas de imprensa não puderam ser recuperados nesta rodada. O inventário textual foi preservado, com fonte e pendência; não foram criados pins presumidos para compensar essas lacunas.

## Espaços históricos e precisão

Referências atuais de praça, rua e equipamento são usadas somente quando a associação com a edição foi conferida. Não se reconstrói a posição antiga de um palco e não se herda um endereço só pela semelhança do nome. Espaços sem coordenadas ficam na lista da edição.

A Praça da Bíblia não recebe o ponto atual da Matriz. O Mestre Neca de 2023 conserva a Rua Erundino Prado, sem ser transferido para a Praça da Bandeira de outra edição. O BNB Cultural de 2025 usa a referência da Praça da Bandeira. Os pontos do Rosário usam o cadastro cartográfico e o link indicado pelo responsável, sem tratar a foto como prova de ocupação histórica.

O enquadramento inicial do histórico privilegia o Centro Histórico; “Ver todos” inclui a Bica. Seleção explícita de um espaço focaliza sua referência; a troca de edição preserva a câmera. Coordenadas de Tsuru/Reurb em 2026 foram reconciliadas com os links fornecidos e confirmados pelo responsável; continuam referências do imóvel, não garantia de entrada.

## Fotografias

20/20 registros atuais têm imagem e legenda. Os nove pendentes foram preenchidos com:

| Registro | Imagem e identificação |
|---|---|
| Mariano Antônio | Teatro no mesmo palco/largo em 2024; Dani Santos/Prefeitura |
| Câmara e Cadeia | Fachada na notícia municipal de outubro de 2026; Dani Santos |
| Feira São Criativos | Rua Erundino Prado junto ao Cine Theatro Elic; Heitor Xavier; não mostra a feira montada |
| Sustentável | Foto de arquivo da atividade usada na divulgação oficial; Yago de Andrade; não comprova montagem no salão de 2026 |
| Cortejos itinerantes | Referência da Praça da Bandeira durante os Capuchinhos em 2023; não representa o percurso |
| Cortejos fixos | Referência do Largo da Matriz durante teatro em 2024; não representa os grupos de 2026 |
| Casa Tsuru | Fachada de arquivo do nº 84 identificada e confirmada pelo responsável; crédito e marca Google Street View preservados |
| Reurb/Co.Lab | Fachada de arquivo identificada no Maps como Secretaria de Serviços Urbanos e confirmada como Reurb/Co.Lab pelo responsável; crédito e marca Google preservados |
| FASC Brincar | Foto municipal da Igreja do Rosário, entorno indicado pelo responsável; Heitor Xavier; não delimita o trecho ocupado pela atividade |

O link novo do responsável foi `https://maps.app.goo.gl/q4gk4G3nXWJzgo8k7`. A miniatura correspondente respondeu 403; foi usada uma foto municipal identificada do mesmo ponto, sem apresentar a quadra de outra notícia como Rua do Rosário. As duas fachadas já obtidas anteriormente mantêm seus créditos e marcas de arquivo. A atribuição não é uma declaração de licença irrestrita das imagens.

## Correções de interação

- Popup de vizinhos acima dos pins, inclusive título, fechamento e opções.
- Proteção contra evento tardio de carregamento após desmontar o mapa.
- Sincronização do afastamento visual com o evento nativo do MapLibre, para evitar um quadro de atraso durante zoom sob carga; coordenadas de origem preservadas.
- Navegação entre modos sem apagar filtros e sem manter reprodução fora do mapa.
- Ao iniciar a reprodução no celular, o histórico volta à visualização de mapa.

## Validação

Resultados finais: 27 testes de domínio aprovados; TypeScript e build de produção aprovados; suíte histórica de navegador aprovada em 18 edições, fotos, curadoria, navegação, reprodução e quatro larguras; suíte de roteiros/memórias/fotos aprovada. Axe não apontou violações nos recortes executados. Estabilidade: 1.131 quadros, desvio máximo de 1,142 px (tolerância 3,5 px), perspectiva preservada ao redimensionar e nenhum erro JavaScript na execução. O Vite mantém o aviso de tamanho do chunk do MapLibre; o acervo é carregado sob demanda. Evidências temporárias: `tmp/history`, `tmp/phase-4`, `tmp/zoom-stability` e `tmp/curation-2` (não versionadas).

Aceite do responsável, nova avaliação em aparelho físico, conferências editoriais indicadas como pendentes e preparação do pitch continuam em aberto. A fase 4 não é declarada encerrada por este documento.

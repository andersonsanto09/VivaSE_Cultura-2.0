# 22 — Fase 4: descoberta cultural, memórias e fotografias

Snapshot inicial de 17/11/2026, preservado como histórico. O estado consolidado de encerramento está no [documento 33](33-FECHAMENTO-FASE-4.md); a expansão posterior da história está no [documento 23](23-MAPA-HISTORICO-E-ACERVO.md).

Revisão: 17/11/2026. Implementação local em andamento, ainda sem aceite do responsável. Este incremento não foi enviado ao GitHub nem publicado no Pages. A publicação anterior permanece disponível.

## O que está implementado

- Navegação Cultura e entrada da Home para Roteiros, Memórias e Linha do tempo.
- Três roteiros editoriais: Entre praças e memórias (quatro paradas), Arte por outros caminhos (três) e De palco em palco (três). Ordem explícita, fonte por parada, agenda do lugar e trajeto externo. O retorno do detalhe preserva o roteiro e o dia. Não são percursos caminháveis vistoriados; não há duração, distância nem acessibilidade inventadas.
- Dois pequenos trechos publicados de visitantes, identificados com autoria, ano e fonte. Um exemplo fictício separado e rotulado. Não são depoimentos do FASC 2026, ainda futuro nesta revisão.
- Lembranças pessoais opcionais com nome/apelido, ano, espaço e texto. Salvamento e exclusão confirmada somente no navegador e na origem do site. Texto de até 1.200 caracteres, nome de até 60 e até 100 lembranças. Erro de leitura, dados desconhecidos, bloqueio e quota não geram falso sucesso nem sobrescrevem dados corrompidos. Não há sincronização remota. A leitura mais recente antes de cada alteração reduz perdas entre abas, sem prometer transações entre abas simultâneas.
- Oito marcos selecionados: 1972, 2005, 2010, 2017, 2022, 2024, 2025 e 2026. Filtro Festival/Cidade, interrupções explícitas e edição 2026 anunciada. Não representa uma edição por ano.
- Fotografia no resumo do pin e no detalhe, carregada sob demanda. Texto alternativo, crédito e fonte visíveis; imagem de arquivo, interior ou referência compartilhada identificados no card. Falha de carregamento mantém o detalhe utilizável e oferece a fonte.

## Fontes culturais

As afirmações estão vinculadas às fontes em `src/data/culture.ts` e nas telas. Foram consultadas publicações institucionais da UFS sobre criação/retomada e o documentário de 50 anos, UNESCO para a inscrição de 2010, Governo de Sergipe para os museus, Turismo municipal para a Casa das Culturas e reportagens da Prefeitura para 2024/2025. A edição futura usa a programação v4 fornecida pelo responsável, sem expor o PDF na interface.

Os dois relatos são trechos da cobertura municipal da primeira noite de 2025: Maria Rafaela Ferreira e Charles Belchior. São 17 palavras citadas no total da mesma publicação; nenhum testemunho foi inventado ou atribuído a um visitante real. Bibliografia localizada em pesquisas anteriores não significa livros integralmente consultados.

## Cobertura fotográfica

11 dos 20 registros possuem fotografia. Fontes, legendas e créditos estão no registro `src/data/place-photos.ts`, exibidos junto à foto.

| Registro | Imagem e limite |
| --- | --- |
| João Bebe Água | Palco/público na Praça São Francisco em 2025; Julia Rodrigues |
| Frei Santa Cecília | Santa Cena no palco em 2025; Markus Mello |
| Samba na Bica | Público na edição 2024; Clara Dias |
| Capuchinhos | Apresentação e público em 2023; Carla Mesquita e Dani Santos |
| Salão de Literatura | Atividade na Escola Gina Franco em 2022; Prefeitura, fotógrafo não informado |
| Espaço de Cuidado | Referência do equipamento compartilhado: a mesma Escola Gina Franco em atividade de literatura de 2022; não retrata o espaço de cuidado de 2026 |
| Cine Trianon | Sala/projeção do Cine Theatro ELIC em registro da reinauguração; Heitor Xavier |
| Casa das Culturas | Interior e exposição de arquivo; portal Turismo, fotógrafo não informado |
| Museu de Arte Sacra | Interior e acervo de arquivo; portal Turismo, fotógrafo não informado |
| Museu Histórico | Fachada e participantes na reinauguração de agosto de 2025; Heitor Xavier |
| Vesta Viana | Fachada publicada em 2025; Heitor Xavier |

Fotografias da imprensa institucional têm atribuição rastreável. Isso não constitui declaração de domínio público nem de licença irrestrita. Antes de ampliar a distribuição, confirmar condições de reutilização ou substituir por acervo próprio/autorizado. Candidatas descartadas não entram no build: peças de divulgação, fotos de outros salões, entrevistas e imagens sem identificação suficiente.

Pendências de foto incorporada: Mariano Antônio, Casa de Câmara e Cadeia, FASC Sustentável, Reurb/Co.Lab, Casa Tsuru, Feira São Criativos, FASC Brincar e as duas frentes de cortejos. São nove registros. A interface informa curadoria pendente e não preenche com foto genérica.

O responsável confirmou em 17/11 que o [primeiro link de fachada](https://maps.app.goo.gl/QscS6yZ3bwC7HgQz5), identificado no Maps como Secretaria de Serviços Urbanos, corresponde à Reurb/Co.Lab; o [segundo](https://maps.app.goo.gl/t9KkQw44G2eNcTMA9), Rua Messias Prado, 84, corresponde à Tsuru. Os links foram incorporados como consulta externa. Eles ainda não são arquivos de fotografia autorizados para incorporação. Nenhuma imagem do Street View foi extraída ou apresentada como foto própria.

## Verificações e limites

- 17 testes de domínio aprovados: memórias, dados culturais e integridade das fotos em `tests/culture.test.ts`, junto aos testes existentes de catálogo.
- Build e verificação TypeScript aprovados nesta revisão.
- O build continua emitindo o aviso de tamanho do módulo do mapa (aproximadamente 1,14 MB antes de gzip), carregado sob demanda. A foto da sala do cinema tem cerca de 3,44 MB; otimização de imagens e conferência sob conexão limitada permanecem na qualidade final.
- `tests/phase-4.py`: roteiro → detalhe com foto → retorno com dia/roteiro; filtros históricos; salvar/recarregar/excluir/cancelar; texto literal sem executar HTML; nenhuma transmissão do texto de teste em requisições observadas; armazenamento corrompido/bloqueado/quota; falha de foto; resumo do mapa e links das fachadas.
- Reflow em 1440, 768, 390 e 320 CSS px. Axe nas três telas culturais em 390 px sem violações detectadas pelos critérios executados. A inspeção visual levou a ajustar a linha do tempo pequena, evitando que o ponto sobrepusesse o ano.
- Regressões `tests/browser.py` e `tests/phase-3.py` aprovadas: orientação, dia/URL/histórico, GPS, foco/teclado, fallback e agenda. A cartografia nesses testes é simulada; não substitui conferência de campo nem comprova carregamento do provedor real nesta revisão.
- Capturas/evidências locais em `tmp/phase-4/`, fora do Git. O relato de celular físico da fase 3 não foi reutilizado como aceite das novas funções.

## Para encerrar a fase

1. Concluir as nove pendências fotográficas, priorizando fachadas e imagens identificáveis do lugar; revisar condições de uso.
2. Avaliar as novas telas e fotografias com o responsável, incluindo salvar/reabrir/excluir uma lembrança em celular físico.
3. Identificar a versão aprovada e publicar quando solicitado; conferir os recursos culturais no subdiretório do Pages. O armazenamento local de localhost é separado do endereço público.
4. Seguir para a fase 5: revisão final dos dados, falhas/rede, apoio visual, sequência e ensaio do pitch.

# 08 — Estratégia de testes e aceite

Referência: 16/11/2026. Cenários planejados, ainda não executados. Revisar Markdown não equivale a testar produto. A Fase 1 não possui contagem de testes aprovados, capturas de telas implementadas ou build da nova aplicação.

## Verificação por camada

Dados: duplicatas, referências a espaços, datas, horários, origens e cobertura. Regras: busca, filtros, passagem da meia-noite, construção do destino externo e leitura/escrita de memórias. Interface: fluxos completos, retorno e falhas essenciais. Revisão manual: visual, teclado, clareza e conteúdo.

Escolher uma ferramenta de testes compatível com a stack na fundação técnica. Não adicionar várias suítes que reproduzam as mesmas verificações. Testes devem confirmar comportamentos e falhas relevantes, não espelhar componentes sem avaliar resultados.

## Matriz de cenários

| ID | Requisitos | Cenário e resultado esperado |
| --- | --- | --- |
| T-01 | RF-01 | Entrar e voltar: mapa abre pela ação principal e retorno não quebra navegação |
| T-02 | RF-02, RF-13 | Reconciliar inventário oficial com espaços: todos os levantados têm situação documentada; pendências explícitas |
| T-03 | RF-02, RF-03, RNF-07 | Buscar com e sem acentos e combinar categoria: lista mantém todos os resultados; mapa só mostra geometrias verificadas, com contagem distinta e aviso para posições pendentes |
| T-04 | RF-03 | Busca sem resultado: mensagem clara e limpar filtros recupera os lugares |
| T-05 | RF-04 | Selecionar na lista e no mapa: mesmos detalhes; voltar preserva estado |
| T-06 | RF-05, RNF-08 | Trocar dia e lugar: atividades e datas coerentes, sem horários inventados |
| T-07 | RF-05 | Madrugada: dia de programação e data civil corretos; ordenação não coloca 01h antes da abertura noturna |
| T-08 | RF-06 | Permitir localização: indicador usa posição recebida e não persiste coordenadas |
| T-09 | RF-06, RNF-03 | Negar, atrasar ou falhar localização: explorar lugares continua possível, com mensagem específica |
| T-10 | RF-07 | Destino externo: URL e endereço coerentes; testar sem abrir rota/conta real automaticamente |
| T-11 | RF-08 | Roteiro: sequência, paradas e detalhes válidos; sem duração ou acessibilidade sem fonte |
| T-12 | RF-09 | Origens de memória: exemplos fictícios identificados; referência publicada tem atribuição; pessoal está na seção local |
| T-13 | RF-10 | Salvar, recarregar e excluir memória: estado local consistente; nada enviado ao servidor |
| T-14 | RF-10, RNF-04 | Armazenamento bloqueado, cheio ou inválido: não anunciar sucesso; recuperar estado sem derrubar a aplicação |
| T-15 | RF-10 | Texto longo, vazio e semelhante a HTML: validação compreensível e conteúdo não executável |
| T-16 | RF-11, RNF-05 | Marco histórico: data, fonte e vínculo com lugar conferidos; lacunas preservadas |
| T-17 | RF-12, RNF-05 | Sobre: fontes, data de revisão e caráter demonstrativo encontráveis |
| T-18 | RNF-01, RNF-02 | Teclado, foco, zoom e 390/768/1440 px: ações acessíveis, sem texto ou botão cobertos |
| T-19 | RNF-03 | Falha de tile e de imagem: listas e conteúdo principal continuam legíveis |
| T-20 | RNF-06 | Medir entrada/mapa/detalhe em produção e registrar condições e resultados reais |

RF-14 é P1: se implementado, acrescentar teste de adicionar, remover e ordenar paradas, incluindo estado vazio.

## Qualidade editorial

Conferir nomes, datas, links e coordenadas por registro. A fonte oficial geral não comprova automaticamente cada horário. Não misturar horários de 2024 com locais de 2026. Fotografias e depoimentos precisam de crédito e avaliação de uso; dados fictícios precisam de indicação próxima ao conteúdo.

## Ambientes

Começar com navegador Chromium disponível, viewports desktop e mobile e localização simulada apenas nos testes. Verificar outro navegador quando disponível; declarar qualquer limitação. Revisar um aparelho físico disponível antes de afirmar qualidade mobile em hardware real. Teste sem internet deve ter falha de rede controlada, sem gerar download em massa de tiles.

## Registro de evidência

Registrar data, versão/commit quando existir, ambiente, cenário, resultado, captura quando necessária e pendência. Separar teste automatizado, revisão manual e pesquisa com usuário. Para falhas, explicar o efeito no pitch e o próximo passo.

## Critérios de saída da implementação

P0 implementados e verificados; erros críticos resolvidos; cobertura de espaços reconciliada; limitações restantes visíveis e aceitas pelo responsável. Typecheck, build e verificação de dados passam. Percurso do pitch executado no ambiente disponível. Decisão visual revisada pelo responsável.

Esses critérios não estão satisfeitos pela documentação. Revisão desta fase valida o planejamento e os links locais, sem executar testes que dependem de uma aplicação inexistente.

## Atualização após implementação

O texto acima preserva os critérios de planejamento. A aplicação já existe: evidências efetivamente executadas na orientação, resultados automáticos, relato em celular físico e limites estão no [relatório da fase 3](15-FASE-3-VALIDACAO.md). Cenários culturais e medições finais permanecem pendentes; não considerar todos os P0 do MVP concluídos.

# Fechamento da fase 4 — descoberta cultural e memória

Encerramento funcional consolidado em 19/11/2026, após solicitação do responsável para finalizar a fase e continuar o trabalho. **Fase 4 concluída no escopo funcional do protótipo.** Os critérios de uso, rastreabilidade e persistência foram verificados com testes automatizados e inspeções de navegador.

Em 19/11/2026, o responsável confirmou a realização do teste solicitado em celular físico e informou “sem problemas”. O roteiro solicitado cobria roteiro/parada, salvar/recarregar/excluir memória e programação histórica por data. Essa verificação está registrada como relato do responsável; aparelho e navegador não foram informados. As lacunas históricas e de documentação de autorização de imagens também continuam explícitas. O fechamento funcional não declara o produto pronto para operação pública definitiva.

## Escopo entregue

| Área | Resultado |
| --- | --- |
| Roteiros | Três percursos culturais com ordem, paradas, fontes, mapa e retorno ao roteiro; progresso salvo no navegador. |
| Memórias | Exploração de relatos publicados e exemplo fictício identificado; criar, editar, excluir e exportar lembranças pessoais. |
| Persistência | Dados locais no aparelho/origem do site, sem servidor; recarga, bloqueio, quota, dados corrompidos e alterações de outra aba tratados. |
| História | 15 marcos documentados e máquina do tempo com 18 edições, sem presumir continuidade anual. |
| Mapa histórico | 125 espaços cadastrados por edição, seleção individual, resumo, programação por data, informações do espaço e fontes. |
| Artistas | 191 nomes preservados, curadoria de 80 destaques, busca e trajetória; 130 nomes com foto, incluindo os 80 destaques. |
| Fotografias dos espaços | 20 registros com foto contextualizada; crédito, origem e alternativa em caso de falha. |
| Participações | 230 registros; 156 datas acrescentadas após pesquisa, totalizando 188 com dia identificado. Anúncio, realização, convite e substituição permanecem distintos. |
| Publicação | Protótipo no GitHub Pages, com as correções de datas e rolagem verificadas na versão pública `23f091c`. |

## Verificação de encerramento

Na consolidação de 18/11 e na reconferência de 19/11 foram executados:

- `npm test`: 42 testes aprovados, cobrindo catálogo, memórias, histórico, agenda pessoal, fotografias e revisões de datas/status.
- `tests/phase-4.py`: roteiro → espaço → retorno; marcos históricos; memória salva após recarga, exclusão cancelada/confirmada; bloqueio, quota e dados corrompidos; alternativa da foto; reflow e axe.
- `tests/planning-browser.py`: programação pessoal, agrupamento, navegação, progresso por roteiro, edição/exportação de memória, privacidade dos links e ciclo de vida do aviso de localização.
- As revisões imediatamente anteriores verificaram as 18 edições, os 130 retratos, o fluxo da agenda histórica e a regressão da rolagem até o fim da lista. Evidências estão nos relatórios 30–32.

As jornadas foram automatizadas em desktop e em larguras móveis, incluindo 320 px. Isso não substitui o retorno de uma pessoa usando aparelho físico. O teste físico da fase 3 cobria orientação; a revisão cultural atual também foi confirmada pelo responsável em 19/11/2026, sem problemas relatados.

## Revisão de fontes e imagens

O [inventário de proveniência](fontes/revisao-proveniencia-fase-4-2026-11-18.json) registra 150 associações fotográficas, correspondentes a 145 arquivos distintos por hash. Há 48 associações com licença declarada; os demais registros têm fonte, crédito e contexto, mas não documentação de autorização específica de republicação no cadastro.

Fotografias de outro contexto não são apresentadas como imagens da respectiva apresentação no FASC. Registros antigos dos espaços não são apresentados como montagem de 2026. Fotos conjuntas identificam os dois participantes. Relatos públicos e exemplo fictício permanecem distinguíveis.

A revisão de atribuição está concluída para o cadastro do protótipo; não é uma declaração de licença irrestrita. A verificação de condições de reutilização ou substituição por acervo próprio/autorizado permanece registrada para a revisão final de publicação.

## Limites documentados do acervo

- 42 participações antigas ainda não têm dia individual comprovado; 13 delas também não têm edição identificada. Os anos e períodos gerais não foram convertidos em datas de apresentação.
- 61 artistas do catálogo completo ainda não têm fotografia selecionada; todos os 80 destaques têm foto.
- Registros sustentados por programação continuam assim identificados. Pesquisa posterior pode acrescentar cobertura de realização sem apagar a referência original.
- Coordenadas históricas são referências atuais verificadas, sem reconstrução de montagens temporárias. Roteiros não equivalem a trajetos vistoriados ou acessíveis.
- A lembrança pessoal depende do armazenamento local e não é sincronizada entre dispositivos; apagar dados do navegador pode removê-la.

Esses limites são características explícitas do recorte documental do MVP. Não será prometido um acervo histórico exaustivo na apresentação.

## Passagem para a fase 5

A fase 4 entrega seu escopo funcional. A **fase 5 — qualidade final e preparação do pitch** recebe as verificações de entrega abaixo, sem ampliar funcionalidades nesta passagem:

1. Revisar a programação de 2026 e eventuais alterações posteriores à v4.
2. Medir carregamento e verificar conexão limitada, mapa e falhas externas.
3. Consolidar a revisão final de créditos, condições de reutilização e mensagens de limite.
4. Conferir contraste, teclado, foco e zoom no MVP completo, preservando o teste físico cultural confirmado nesta revisão. Testes de GPS e orientação em campo seguem na qualidade final.
5. Confirmar duração/equipamento/internet do pitch; preparar roteiro e apoio visual para falha de rede.

O checklist mestre é o [documento 13](13-CHECKLIST-DO-PROJETO.md). O documento 22 é um retrato inicial de 17/11, não o estado atual da entrega.

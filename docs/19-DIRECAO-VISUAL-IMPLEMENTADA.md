# 19 — Direção visual implementada

Revisão de 17/11/2026, antes da fase 4. Implementação autorizada após análise, comparação de duas direções e seleção da mescla pelo responsável. Este registro não encerra as funcionalidades culturais ainda pendentes.

## Composição escolhida

- Home: abertura Cartaz vivo, título “A cidade é o festival”, amarelo, enquadramento ampliado da arte oficial e faixa roxa.
- Continuação: calendário “Três dias. Muitos encontros.” e categorias na faixa roxa do Atlas cultural.
- Mapa: cabeçalho amarelo, superfícies claras, ícones por categoria e ferramentas. Selecionar um pin no desktop mantém a lista e abre o resumo sobre o mapa; “Ver detalhes” abre o painel completo. No celular, a seleção leva diretamente aos detalhes.
- Programação: cabeçalho Cartaz vivo e cards Atlas cultural, eixo vertical de horários e bordas por categoria.

O asset oficial e a logo vetorial foram preservados. A arte foi enquadrada por CSS, sem redesenhar personagens. Sua resolução original limita a nitidez de ampliações; um arquivo oficial de maior resolução/vetorial pode melhorar o acabamento futuramente.

## Refinamentos incorporados

- Categorias com hierarquia de ícone, título, contagem e ação. Hover de até 2 px e deslocamento curto da seta.
- CTA primário preenchido e secundário sublinhado, estados de interação distintos e foco visível.
- Horários protagonistas; categoria discreta; ação circular com nome acessível específico.
- Transições em CSS de 160–180 ms, condicionamento de hover a ponteiro apropriado e movimento reduzido. Sem bibliotecas novas ou animação de posições dos pins.
- Filtros por categoria/espaço recolhíveis, estado ativo resumido e limpeza disponível.
- Agenda com revisão resumida e explicação expansível. “Agora” não indica atividade ao vivo por uma bolinha verde permanente fora das datas.
- Detalhes antecipam o primeiro horário anunciado, sem alegar que ele é a próxima atração. Contexto e fontes continuam disponíveis.
- Sobre apresenta propósito e prioridades antes do inventário técnico; inventário permanece acessível.
- CSS consolidado; estilos antigos de Leaflet e agrupamento removidos. Geometria e algoritmo de estabilidade mantidos.

## Verificação

- `npm run build`: TypeScript e produção aprovados. Permanece o aviso conhecido de tamanho do chunk MapLibre; mapa continua carregado sob demanda. Não foi feita medição de desempenho de campo.
- `npm test`: nove testes de domínio aprovados.
- `python -X utf8 tests/browser.py`: navegação, buscas, agenda, endereços e falhas externas aprovados.
- `python -X utf8 tests/phase-3.py`: teclado, foco, URL, histórico, retorno à agenda, cópia, GPS e reflow aprovados; cinco telas sem violações automáticas axe.
- `python -X utf8 tests/visual-review.py`: 20 pins individuais, 19 centrais na abertura, visão geral com Bica, filtros, intervalos conhecidos e cores de dia consistentes.
- `python -X utf8 tests/map-stability.py`: 489 quadros, variação máxima de 1,37 px para tolerância de 3,5 px; perspectiva preservada no redimensionamento.
- `python -X utf8 tests/map-gestures.py`: roda, arraste com botões do meio/direito e perspectiva aprovados.
- `python -X utf8 tests/design-review.py`: Home/agenda em 1440, 768, 390 e 320 px, sem overflow; horários com minutos dentro da coluna; hover e movimento reduzido verificados.

Na agenda de 21/11, a primeira atividade em 390 px passou de aproximadamente 904 px para 566 px abaixo do topo. O teste visual também identificou e corrigiu horários com minutos ultrapassando o eixo.

Capturas da revisão estão em `tmp/redesign/`; relatórios das regressões ficam nas pastas `tmp/` correspondentes. Esses artefatos locais são regeneráveis e não integram o build público. Testes de fluxos usam cartografia simulada para evitar consumo desnecessário; a inspeção visual incluiu o mapa MapTiler real.

## Pendências e limites

- Aceite visual do responsável sobre a versão implementada.
- Novo teste em aparelho físico após o redesign; o retorno anterior do responsável se refere à versão anterior.
- Roteiros, memórias e linha do tempo continuam na fase 4.
- Endereços e referências aproximadas não foram convertidos em entradas exatas. Nenhum percurso interno, acessibilidade ou duração de show desconhecida foi inventado.

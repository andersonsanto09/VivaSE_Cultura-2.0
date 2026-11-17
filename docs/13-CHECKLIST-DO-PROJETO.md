# 13 — Checklist de todas as fases do projeto

Atualizado em 17/11/2026. `[x]` = executado/registrado; `[ ]` = pendente ou ainda depende de aceite. Uma função existente não encerra sua fase sem a validação correspondente. Este é o estado do protótipo desta revisão, não uma promessa de prazo.

**Fases 1, 2 e 3 concluídas no escopo do protótipo. Próxima fase: 4 — roteiros, memórias e linha do tempo.** Limites e evidências da orientação estão no [relatório da fase 3](15-FASE-3-VALIDACAO.md).

**Revisão estética antes da fase 4:** mescla aprovada de Cartaz vivo e Atlas cultural implementada em 17/11/2026. Evidências e limites no [registro 19](19-DIRECAO-VISUAL-IMPLEMENTADA.md). A avaliação visual desta versão pelo responsável permanece pendente.

- [x] Home com abertura de Cartaz vivo, calendário editorial e categorias em faixa roxa.
- [x] Cabeçalhos amarelos no mapa e na programação; linha do tempo com cards por categoria.
- [x] Hierarquia de ícone/título/ação, CTAs distintos e microinterações curtas com movimento reduzido.
- [x] Filtros recolhíveis, informações práticas antecipadas e estado de “agora” fora do festival.
- [x] Regressão de orientação, gestos e estabilidade dos pins; reflow até 320 px.
- [ ] Aceite visual da versão implementada e nova conferência em celular físico.
- [x] Corrigir o afastamento excessivo dos pins na visão geral, com separação proporcional ao zoom e referências preservadas (registro 20).
- [x] Aprovar a fotografia, sua largura e o dourado da Home; publicação solicitada pelo responsável.
- [x] Commit/push realizados e GitHub Pages publicado; foto, logo, mapa, busca e programação verificados no endereço público (registro 21).

## Fase 1 — Planejamento e definição do produto

**Situação: encerrada como planejamento.**

- [x] Público principal: turista que precisa se orientar durante o FASC.
- [x] Prioridades: orientação, descoberta cultural e preservação da memória.
- [x] Escopo do MVP e critérios de aceite registrados.
- [x] Edição 2026 e distinção entre datas do festival e do ideathon.
- [x] Arquitetura sem backend e decisões técnicas iniciais.
- [x] Jornadas, requisitos de qualidade e estratégia de testes planejados.
- [x] Matriz CSD em texto e PDF.
- [x] Fontes iniciais, riscos, dúvidas e limitações documentados.
- [x] Nome VivaSE Cultura e direção FASC 2026 aceitos provisoriamente.
- [x] Documentação inicial enviada ao GitHub (`6d2bb88`).

Critério cumprido: escopo registrado e dúvidas explícitas. A hipótese de utilidade para turistas ainda precisa de validação com pessoas; planejamento não comprova resultado de campo.

## Fase 2 — Fundação técnica, visual e conteúdo

**Situação: concluída tecnicamente, com revisão do protótipo pelo responsável. O refinamento visual continua nas próximas fases.**

- [x] Ambiente React/TypeScript/Vite e scripts funcionando.
- [x] Dependências corrigidas e build de produção aprovado.
- [x] Entrada com identidade visual do FASC 2026.
- [x] Base responsiva de navegação, mapa/lista, agenda e detalhes.
- [x] Inventário dos 20 espaços/frentes encontrados na v4.
- [x] 144 registros dos três dias reconciliados com as 21 páginas de conteúdo.
- [x] Fontes por página e revisão editorial registradas.
- [x] Referências cartográficas para todos os registros, com precisão declarada.
- [x] Compartilhamento de equipamentos e cortejos tratados sem inventar posições/percurso.
- [x] Endereços fornecidos pelo responsável incorporados.
- [x] Busca, filtros de agenda, intervalos e datas de madrugada.
- [x] Sete testes de domínio, typecheck e build aprovados.
- [x] Fluxos de navegador e inspeção em 1440, 768 e 390 px.
- [x] Lista mestra, limitações e relatório técnico atualizados.
- [x] Apresentar o protótipo ao responsável e aplicar as correções de identidade, ícones, logo e interação solicitadas.
- [x] Substituir Leaflet por MapLibre/react-map-gl e MapTiler, preservando atribuição e lista alternativa.
- [x] Extrair a logo oficial vetorial transparente e aplicá-la ao cabeçalho.
- [x] Retirar a imagem solta e os links de PDF das telas; fonte fora do build público.
- [x] Corrigir zoom dos marcadores e preservar âncoras geográficas em todos os níveis.
- [x] Habilitar roda, inclinação/rotação por arraste e botão de perspectiva; verificar no navegador.
- [x] Avaliar recomendações enviadas por mensagens e registrar escolhas de tecnologias e melhorias. O arquivo `.txt` em si não foi recebido; isso não bloqueia a entrega.

Critério técnico cumprido: base executável, dados coerentes e direção discutida. Precisão de rua/praça continua declarada; não equivale a coordenadas de portas nem a vistoria de acessibilidade.

## Fase 3 — Conclusão e validação dos fluxos de orientação

**Situação: concluída para orientação do protótipo. Testes, revisão e retorno do responsável em celular físico registrados.**

- [x] Entrada abre mapa, e navegação permite voltar.
- [x] Lista e mapa permitem selecionar espaços; cada registro tem marcador individual, inclusive em referências compartilhadas.
- [x] Busca por espaço/atração, categorias e limpeza de filtros.
- [x] Detalhe mostra endereço, agenda, fonte e referência geográfica.
- [x] Programação por dia e lugar, com busca por participantes.
- [x] Localização por ação, recusa tratada e retorno à área do festival.
- [x] Trajeto externo e ação de copiar endereço implementados.
- [x] Lista permanece disponível em falha do mapa.
- [x] Verificar RF-01 a RF-07, RF-12 e RF-13 com automação, inspeção e relato do responsável; registrar métodos e limites no documento 15.
- [x] Cobrir indisponibilidade/timeout do GPS, API ausente, exceção síncrona, resposta tardia e falha da cópia de endereço.
- [x] Conferir filtros, dia, URL, reload, histórico e acesso direto; retornar à agenda original quando o detalhe vier dela.
- [x] Revisar teclado, foco, nomes acessíveis e reflow equivalente a 200% (640 CSS px para uma tela-base de 1280 px); zoom nativo permanece na qualidade final.
- [x] Teste do responsável em celular físico: percurso proposto funcionou, sem cortes ou travamentos; aparelho/navegador não informados.
- [x] Aplicar os ajustes de interação e composição solicitados na avaliação até esta revisão.
- [x] Verificar roda do mouse, arraste com botão do meio/direito e alternância de perspectiva.
- [x] Corrigir falhas encontradas na validação desta fase; refinamentos finais e verificações ampliadas seguem na fase 5.

Critério de saída: percurso completo “encontrar atividade → escolher espaço → entender referência → abrir trajeto” repetível, inclusive sem GPS ou fundo do mapa.

## Fase 4 — Descoberta cultural e preservação da memória

**Situação: próxima fase, ainda não implementada.**

- [ ] Selecionar lugares e conteúdo cultural com fontes por afirmação.
- [ ] Criar roteiros temáticos com ordem e paradas explícitas.
- [ ] Integrar parada ao detalhe/mapa e ao trajeto externo.
- [ ] Evitar prometer duração, distância ou acessibilidade de percurso não verificado.
- [ ] Criar exploração de memórias, distinguindo exemplos fictícios e referências públicas.
- [ ] Pesquisar e atribuir relatos publicados que possam entrar na interface.
- [ ] Permitir escrever lembrança salva somente no navegador/aparelho.
- [ ] Permitir excluir lembrança e verificar persistência ao recarregar.
- [ ] Tratar falha, indisponibilidade e limite de armazenamento sem alegar salvamento.
- [ ] Informar que apagar dados do navegador pode remover lembranças.
- [ ] Criar linha do tempo com marcos históricos documentados e fontes acessíveis.
- [ ] Conferir datas e descontinuidades; não inventar edições, públicos ou artistas.
- [ ] Conferir direitos de imagens e trechos antes de incorporá-los.
- [ ] Verificar integração dessas funções no celular e testar as jornadas culturais.

Critério de saída: roteiros, memórias e linha do tempo utilizáveis, fontes rastreáveis e persistência local testada. RF-08 a RF-11 são parte do MVP e continuam obrigatórios.

## Fase 5 — Qualidade final e preparação do pitch

**Situação: pendente; verificações iniciais já existem.**

- [x] Primeiro conjunto automatizado de verificações e capturas criado.
- [ ] Reconferir programação e eventuais revisões após a v4.
- [ ] Revisar o conjunto final de dados, créditos, limites e mensagens.
- [ ] Medir carregamento e revisar conexão limitada e falhas externas.
- [ ] Fazer revisão final de contraste, teclado, foco, zoom e celular.
- [ ] Executar os cenários aplicáveis da estratégia de testes no MVP completo.
- [ ] Corrigir falhas que comprometam a apresentação e repetir os testes afetados.
- [ ] Confirmar dia, duração, banca, equipamento e internet do pitch quando a organização informar.
- [ ] Definir roteiro demonstrável que mostre as três prioridades do produto.
- [ ] Preparar apoio visual real para eventual falha de rede; não prometer mapa offline.
- [ ] Preparar material de pitch e ensaiar dentro do tempo disponível.
- [ ] Registrar limitações e próximos passos na entrega final.
- [ ] Fazer commit/push da versão final quando solicitado e conferir sincronização.
- [ ] Combinar hospedagem/publicação se necessária à apresentação.

Critério de saída: demo repetível, material de apoio, limitações conhecidas e versão de apresentação identificada.

## Pós-MVP — Fora das cinco fases da primeira apresentação

Não são requisitos para concluir o protótipo acordado. Só entram com nova decisão de escopo.

- [ ] Administração de programação, login e controle de acesso.
- [ ] Backend e sincronização de lembranças entre aparelhos.
- [ ] Publicação compartilhada de memórias e moderação.
- [ ] Comparação estatística de edições com dados comprovados.
- [ ] Roteiro pessoal com seleção/remoção de paradas (RF-14, melhoria P1).
- [ ] Operação pública: infraestrutura, provedor de mapas, monitoramento e manutenção.
- [ ] Expansão para outros eventos e funcionalidades além do escopo inicial.

## Dependências que não devem ser confundidas com fases concluídas

- O responsável revisou o protótipo e as correções pedidas foram aplicadas. Isso não equivale à validação do MVP completo ou à aprovação de funções ainda não implementadas.
- Recomendações recebidas por mensagens já foram avaliadas. Eventual `.txt` adicional será novo material de revisão.
- Banheiros, emergências, bloqueios e acessibilidade: dependem de fonte específica da edição; não serão inventados.
- Pesquisa histórica: bibliografia localizada não equivale a livros integralmente lidos.
- Recursos e duração do pitch: ainda não informados.

Referências: [roadmap](09-ROADMAP.md), [requisitos](02-REQUISITOS.md), [fundação](11-FASE-2-FUNDACAO.md) e [inventário](12-INVENTARIO-E-PROGRAMACAO.md).

## Ajustes após avaliação do responsável — 16/11/2026

- Removida a lista agrupada do mapa; 20 marcadores individuais abrem diretamente seus espaços. Separação visual não altera as coordenadas de origem.
- Removidos links do PDF das telas. Fonte preservada em `docs/fontes/`, sem PDF no build público.
- Sete testes, typecheck, build e suíte de navegador aprovados após os ajustes; capturas desktop/mobile revistas.

Revisão após feedback: [14 — Mapa vetorial, ícones e identidade FASC](14-MAPA-VETORIAL-E-REVISAO-VISUAL.md).

## Snapshot solicitado para o GitHub

O responsável solicitou commit e push desta revisão. O snapshot reúne fundação, inventário/agenda, mapa vetorial, identidade e correções de interação. Configuração real do MapTiler fica em `.env.local`, ignorado pelo Git; apenas `.env.example` é versionado. A confirmação de envio e o identificador do commit são conferidos no Git e informados na entrega.

Próximo trabalho: construir roteiros, memórias locais e linha do tempo na fase 4. Nenhuma dessas funções culturais deve ser marcada como entregue antecipadamente.

Encerramento da orientação: [15 — Validação da fase 3](15-FASE-3-VALIDACAO.md). O relato em celular físico é do responsável; testes de GPS real por HTTPS e em campo continuam na revisão final.

Revisão da entrada/agenda: [16](16-REVISAO-MAPA-AGENDA-E-LANDING.md). A experiência agrupada foi substituída pela decisão mais recente em [17 — Pins individuais](17-PINS-INDIVIDUAIS-E-PROXIMOS-PASSOS.md). Cards filtram categorias; agenda inclui categoria e modo “agora” por intervalos publicados.

## Última revisão — mapa e publicação do snapshot

- [x] Sem cluster: um pin por espaço, sem ocultar os outros ao selecionar.
- [x] Pins menores; número somente no selecionado e na lista.
- [x] Afastamento apenas quando há colisão, limitado em pixels, com traço à âncora original.
- [x] Abertura no Centro Histórico; visão geral inclui a Bica.
- [x] Lista de vizinhos para sobreposição residual, sem zoom automático.
- [x] Preservar chips/legenda, precisão aproximada, cards que filtram, cores dos dias, Radix e agenda “agora”.
- [x] Revalidar domínio, jornadas, foco/teclado, gestos, fallback e larguras de tela.
- [x] Preparar snapshot solicitado para commit/push, com configuração real fora do Git.

Fases 1, 2 e 3 concluídas no escopo do protótipo; fase 4 é o próximo trabalho. Confirmação do push e hash do snapshot são informados após a checagem do remoto. Próximos passos detalhados no documento 17.

## Manutenção antes da fase 4 — 17/11

- [x] Analisar o vídeo e confirmar o bug com o responsável.
- [x] Eliminar redistribuição de pins durante o zoom; manter afastamento estável e pins individuais.
- [x] Preservar câmera ao redimensionar e manter enquadramento ao revelar mapa oculto.
- [x] Refinar contornos, detalhe, controles, aviso de precisão e legenda móvel.
- [x] Nove testes de domínio, teste de estabilidade por quadros, regressões e build.
- [ ] Avaliar a nova versão com o responsável; este ajuste não inicia a fase 4.

Detalhes: [18 — Correção do zoom e acabamento](18-CORRECAO-ZOOM-E-ACABAMENTO.md).

# 09 — Roadmap, riscos e dúvidas

Atualização de estado: 19/11/2026. Planejamento inicial: 16/11/2026. O ideathon vai de 19 a 21/11. A data exata do pitch e sua duração ainda não foram informadas; planejar para ter um percurso demonstrável antes do início em 19/11. As datas abaixo são proposta de organização, não garantia de entrega nem horas de trabalho confirmadas.

## Fases

| Fase | Entrega | Critério de saída | Situação |
| --- | --- | --- | --- |
| 1 — Planejamento | Dez documentos, matriz CSD e fontes iniciais | Escopo registrado, dúvidas explícitas e revisão de coerência | Encerrada; direção visual provisória registrada |
| Conversa de design | Referências, direção, composição e prioridades visuais | Responsável escolhe a direção antes das telas | Direção FASC 2026 aceita provisoriamente; refinar no protótipo |
| 2 — Fundação e conteúdo | Entrada, base técnica, inventário de espaços e agenda revisada | Build/typecheck, dados coerentes e base visual discutida | Concluída tecnicamente; protótipo revisado e correções solicitadas aplicadas |
| 3 — Fluxos do MVP | Mapa, busca, localização, detalhes, agenda e trajeto externo | Percurso de orientação verificado | Concluída no escopo do protótipo; evidências e limites no documento 15 |
| 4 — Cultura e memória | Roteiros, memórias locais e linha do tempo | Conteúdo e origens identificados, persistência testada | Concluída no escopo funcional do protótipo; evidências, limites e pendências de validação final no documento 33 |
| 5 — Preparação do pitch | Revisão mobile, falhas, evidências e material de apoio | Percurso repetível e limitações conhecidas | Próxima; verificações iniciais existentes, validação final pendente |

## Sequência sugerida para a janela disponível

- 16/11: consolidar planejamento e discutir design; iniciar pesquisa do inventário completo.
- 17/11: fundação e fluxo de orientação, com entrada, mapa, agenda e detalhes.
- 18/11: completar conteúdo e funções culturais, revisar e registrar o percurso do pitch.
- 19 a 21/11: ajustes dirigidos por falhas e pelas regras do evento; evitar ampliar escopo sem avaliar impacto.

Cada etapa depende de disponibilidade, materiais e validação. Cobertura de todos os espaços, memórias e linha do tempo pertencem ao escopo acordado; dificuldades de prazo devem ser comunicadas antes de propor redução, sem omitir funções silenciosamente.

## Riscos e mitigação

| ID | Risco | Ação proposta | Responsável pela resolução |
| --- | --- | --- | --- |
| R-01 | Programação muda perto do festival | Registrar fonte/data e reconferir antes do pitch; evitar alegação de tempo real | Curadoria/equipe |
| R-02 | Espaços omitidos ou coordenadas erradas | Reconciliar fontes e lista mestra; indicar incerteza, sem criar precisão falsa | Curadoria/desenvolvimento |
| R-03 | Internet ou tiles falham | Manter alternativa em lista; preparar apoio visual do fluxo real | Desenvolvimento/apresentador |
| R-04 | Permissão de localização negada | Fluxo completo sem GPS e endereço copiável | Desenvolvimento |
| R-05 | Relatos fictícios parecem reais | Identificação na própria memória e separação das referências públicas | Conteúdo/design |
| R-06 | Memória local é apagada ou falha ao salvar | Aviso de limite, exclusão e tratamento de armazenamento | Desenvolvimento |
| R-07 | Funcionalidades excedem a janela | Construção por fluxo completo; comunicar risco e negociar ajuste concreto | Desenvolvimento/responsável |
| R-08 | Herança técnica vulnerável ou instalação incompleta | Conferir audit e esbuild na fundação; corrigir com compatibilidade verificada | Desenvolvimento |
| R-09 | Direção visual não corresponde ao desejado | Conversa e propostas antes de implementar telas | Responsável/design |
| R-10 | Direitos de foto ou depoimento incertos | Selecionar material elegível, crédito e referência; adiar uso incerto | Curadoria |

## Perguntas em aberto

| ID | Questão | Situação | Quando resolver |
| --- | --- | --- | --- |
| Q-01 | Quem é a banca e quanto dura o pitch? | Responsável ainda não sabe | Quando organização informar; não inventar |
| Q-02 | Haverá demo ao vivo, projetor e internet? | Apenas formato pitch confirmado | Antes de escolher apoio e ensaio final |
| Q-03 | Em qual dia/horário ocorrerá a apresentação? | Evento de 19 a 21/11 | Antes do ensaio; preparar percurso para 19/11 |
| Q-04 | Qual direção visual seguir? | Resolvida provisoriamente: identidade FASC 2026, entrada vibrante e consulta clara | Refinar com o protótipo |
| Q-05 | Qual inventário completo de locais e atividades? | V4 reconciliada: 20 registros de espaços/frentes e 144 de agenda; revisar atualizações | Antes de afirmar cobertura completa |
| Q-06 | Quais fotos e relatos públicos podem entrar? | Pesquisa inicial; exemplos fictícios autorizados | Antes de incorporar mídias e referências reais |
| Q-07 | Qual provedor de tiles e aplicativo de destino? | MapLibre/react-map-gl com MapTiler e Google Maps externo; sem mapas offline ou garantia de disponibilidade | Reavaliar antes de operação pública |

## Atualização da Matriz CSD

A [matriz](MATRIZ-CSD.md) e seu PDF preservam o registro inicial do ideathon. As decisões de incluir memórias e adiar administração refinam o escopo, mas não comprovam as hipóteses sobre turistas. Não mover suposições para certezas apenas porque a equipe escolheu implementá-las.

## Passagem para a próxima etapa

O responsável solicitou finalizar a fase 4. O escopo funcional foi consolidado com testes, rastreabilidade e limites no [documento 33](33-FECHAMENTO-FASE-4.md). A próxima fase é qualidade final e preparação do pitch. O teste final dos novos fluxos em aparelho físico e as condições de reutilização das mídias sem autorização específica registrada continuam pendentes nessa validação final. O protótipo já está publicado no GitHub Pages.

Checklist operacional de todas as fases: [13 — Checklist do projeto](13-CHECKLIST-DO-PROJETO.md).

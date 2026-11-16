# 02 — Requisitos

Referência: 16/11/2026. Todos os requisitos abaixo estão planejados, sem implementação ou teste de produto nesta fase. P0 significa obrigatório para a primeira apresentação; P1, melhoria proposta que não pode comprometer o P0. A numeração é estável para vincular implementação e testes.

## Requisitos funcionais

| ID | Prioridade | Comportamento esperado | Critério de aceite |
| --- | --- | --- | --- |
| RF-01 | P0 | Entrada apresenta VivaSE, FASC 2026, cidade e ação para abrir o mapa | Botão abre o mapa; voltar à entrada funciona |
| RF-02 | P0 | Lista contém todos os espaços levantados para 2026; mapa representa suas localizações verificadas | Todos aparecem na lista; somente pontos, áreas ou percursos conferidos aparecem no mapa; itens sem posição têm pendência e contagem visíveis |
| RF-03 | P0 | Busca encontra espaços e atrações; categorias filtram o conjunto de conteúdo | Busca ignora caixa e acentos; total de resultados inclui itens sem posição, distinguindo-os dos resultados localizados no mapa |
| RF-04 | P0 | Detalhe de lugar mostra identificação, endereço/referência, atividades e fontes disponíveis | Selecionar na lista ou no mapa abre o mesmo lugar; voltar preserva contexto |
| RF-05 | P0 | Programação pode ser consultada por dia e lugar | Atividade referencia lugar existente; horário desconhecido aparece como “Horário a confirmar”, sem inventar valor |
| RF-06 | P0 | Visitante pode solicitar a própria localização | Pedido só ocorre após ação; recusa, indisponibilidade e timeout mantêm exploração utilizável |
| RF-07 | P0 | “Como chegar” abre destino em mapa externo | Link contém o destino revisado e informa saída do VivaSE; copiar endereço continua disponível |
| RF-08 | P0 | Roteiro cultural apresenta uma sequência de lugares | Ordem explícita, detalhes e acesso a cada parada; não apresenta linha reta como caminho caminhável |
| RF-09 | P0 | Memórias permite explorar exemplos e, quando disponíveis, referências reais | Fictício, relato publicado e memória pessoal são distinguíveis na própria leitura |
| RF-10 | P0 | Visitante pode escrever e remover uma lembrança local | Conteúdo reaparece ao recarregar no mesmo navegador; aviso de armazenamento local; exclusão funciona |
| RF-11 | P0 | Linha do tempo apresenta marcos históricos documentados | Cada marco tem data/período, descrição e fonte; não inventar uma edição por ano |
| RF-12 | P0 | Sobre/créditos informa protótipo, origem dos dados e limites | Não se apresenta como serviço oficial ou em tempo real; créditos acessíveis |
| RF-13 | P0 | Conteúdo de todos os espaços é reconciliado com fontes oficiais | Lista mestra registra incluídos, pendentes, itinerantes e excluídos com motivo; pendência não é escondida |
| RF-14 | P1 | Roteiro pessoal permite selecionar e remover paradas | Ordem visível e estado vazio claro; salvar preferências localmente é opcional |

Todos os P0 são compromissos de escopo; ordem de construção não autoriza omitir memórias ou linha do tempo. Se o prazo ameaçar o conjunto, propor redução concreta ao responsável antes de alterar o compromisso.

## Requisitos não funcionais

| ID | Requisito | Evidência planejada |
| --- | --- | --- |
| RNF-01 | Uso prioritário em celular, com teclado e zoom preservados | Capturas em 390, 768 e 1440 px; percurso manual por teclado e revisão em aparelho disponível |
| RNF-02 | Texto, ícones e foco legíveis | Contraste alvo 4,5:1 para texto comum, 3:1 para texto grande e controles essenciais, revisão de foco e nomes acessíveis |
| RNF-03 | Alternativa ao mapa e às integrações externas | Lista utilizável quando os tiles falharem; endereço consultável quando o aplicativo externo não abrir |
| RNF-04 | Memórias pessoais permanecem locais | Sem envio para API; sem coordenadas reais persistidas; erros de armazenamento tratados sem alegar salvamento |
| RNF-05 | Dados rastreáveis | Fontes, revisão e edição associadas aos registros; origens demonstrativas explícitas |
| RNF-06 | Resposta adequada em conexão limitada | Conteúdo textual antes de imagens pesadas; mapa carregado ao entrar; plano de medição no documento 07 |
| RNF-07 | Estado consistente | Seleção, filtros, data e retorno não se contradizem; uma fonte de dados por entidade |
| RNF-08 | Honestidade temporal | “Agora” só por horário do dispositivo e registros completos, sem alegar acompanhamento oficial ao vivo |
| RNF-09 | Código organizado e verificável | Typecheck e build, validação dos dados e testes dos fluxos críticos no documento 08 |

## Fora desta entrega

Área administrativa, login, servidor de memórias, publicação de relatos para todos, moderação pública, pagamentos, navegação curva a curva dentro do VivaSE, acompanhamento de lotação, atualização automática oficial, mapas offline por download de tiles e comparação estatística entre edições. Expansão para outros festivais permanece visão futura.

Origem do escopo: [01](01-VISAO-DO-PRODUTO.md). Jornadas: [05](05-EXPERIENCIA-E-JORNADAS.md). Verificação: [08](08-ESTRATEGIA-DE-TESTES.md).

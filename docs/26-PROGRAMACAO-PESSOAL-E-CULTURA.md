# 26 — Programação pessoal, Cultura e aviso do mapa

Revisão iniciada em 17/11 e concluída tecnicamente em 18/11/2026. Implementação das melhorias solicitadas para Programação e Cultura, preservando a direção visual aprovada do FASC. A fase 4 continua aguardando aceite e conferências editoriais; testes automatizados não substituem o novo teste em aparelho físico.

## Programação

- Minha programação: salvar/remover atividades neste navegador, com persistência e visão por dia. Coleção separada das lembranças, sem conta ou servidor.
- Visões por horário e por palco/espaço, preservando atividades e filtros nos links.
- Detalhe individual acessível com fechamento por Escape, informações, ação de salvar, compartilhamento por link e acesso ao espaço.
- Períodos manhã/tarde/noite/madrugada, além de Agora e A seguir. Madrugadas continuam pertencendo ao dia de programação anterior; datas civis são calculadas sem deslocamento duplicado.
- Conflitos entre intervalos conhecidos e avisos de mesmo início; nenhum fim de show ou deslocamento é presumido.
- Relações explícitas entre artistas do acervo e anúncios de 2026, em ambos os sentidos. Não acrescentam apresentações realizadas ao histórico.

## Cultura

- Entrada própria em Cultura: descobrir a cidade, explorar a história e guardar uma lembrança; navegação existente preservada.
- Mapa das paradas dos três roteiros, início e marcação manual de visitas, progresso local independente por roteiro.
- O mapa mostra referências de lugares. Não há linha de caminhada inventada, navegação automática ou garantia de acessibilidade.
- Lembranças pessoais: editar sem trocar ID/criação, cancelar edição, filtrar ano/lugar e exportar cópia JSON. Exportação contém somente os campos pessoais já armazenados.
- Leituras inválidas e falhas de quota não são apresentadas como sucesso nem sobrescrevem os dados existentes.

## Correção do aviso

A mensagem “Mapa retornou à área do festival.” desaparece após sete segundos. Avisos de localização também têm botão Fechar. O temporizador é limpo ao trocar a mensagem ou sair da tela; a espera por GPS não expira por esse temporizador. Voltar ao festival invalida eventual solicitação de GPS ainda pendente.

## Verificação

- 32 testes de domínio: catálogo, histórico, lembranças, coleções, períodos, conflitos e referências entre artistas/atividades.
- Jornadas de navegador em `tests/planning-browser.py`: salvar/recarregar/remover, detalhe/Escape, agrupamento, período, histórico/2026, roteiros, edição/exportação/cancelamento e expiração/fechamento do aviso.
- Compartilhamento individual sem encadear origem interna; erro de quota sem favorito aparente.
- Regressões culturais, visuais e históricas preservadas. Cards comuns continuam compactos; o limite visual inclui agora os controles Salvar e Ver espaço.
- Reflow de 320 a 1440 px; verificações axe móveis. Mapas simulados nas jornadas funcionais para não depender de rede externa.

## Revisão humana pendente

Conferir a nova versão no celular, especialmente programação pessoal, detalhe, mapa de roteiro e formulário de edição. Arquivos exportados não têm mecanismo de importação nesta revisão. Progresso e favoritos não são sincronizados entre aparelhos. Horários dependem do relógio do aparelho e da programação anunciada.

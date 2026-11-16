# 05 — Experiência e jornadas

Referência: 16/11/2026. Fluxos propostos para detalhar no design. Formato de apresentação informado: pitch; duração, banca e dispositivo ainda desconhecidos.

## Pergunta principal

“Onde fica o que eu quero visitar no festival e como chego lá?” O visitante não precisa entender a estrutura do FASC ou conhecer os nomes das praças para começar.

## Organização do conteúdo

- Início: proposta, edição, datas, cidade e entrada para o mapa. Seções extras somente quando ajudam a compreender a experiência.
- Mapa: lugares, busca, categorias, localização e lista equivalente.
- Programação: atividades por dia e espaço, ligadas aos lugares do mapa.
- Roteiros: percursos culturais por paradas, com acesso ao destino externo.
- Memórias: referências editoriais e lembranças pessoais locais, claramente diferenciadas.
- Linha do tempo: marcos documentados do festival e, quando relevante, da cidade.
- Sobre e fontes: identificação do protótipo, créditos e origem dos dados.

Esses destinos não obrigam sete abas visíveis. Agrupamento e navegação mobile serão decididos no design. Comparação de edições não compõe este escopo.

## J-01 — Encontrar uma atração

Entrada -> abrir mapa -> buscar nome de atração ou lugar -> selecionar resultado -> consultar horário, dia e endereço -> “Como chegar” -> aplicativo externo.

O resultado de atração identifica seu espaço e sua data. Se há várias apresentações, o visitante escolhe uma. Retornar do aplicativo ou fechar o detalhe deve preservar busca e contexto sempre que a sessão permitir.

## J-02 — Descobrir o que acontece em um espaço

Mapa ou lista -> lugar -> atividades do dia selecionado -> trocar dia -> abrir outra atividade ou ver contexto cultural. Filtros não devem fazer parecer que um espaço deixou de existir historicamente; agenda atual e acervo histórico são camadas distintas.

## J-03 — Usar localização

Visitante aciona “Minha localização” -> explicação breve -> permissão do navegador -> indicador no mapa com precisão aproximada. Se recusar ou falhar, mostrar alternativa de explorar a cidade e endereço do lugar. Não solicitar permissão ao abrir a entrada nem reabrir prompts repetidamente.

Se estiver fora de São Cristóvão, informar o contexto e permitir voltar ao festival. Não deslocar automaticamente a pessoa para dentro do evento nem confundir uma posição demonstrativa com GPS real.

## J-04 — Seguir um roteiro cultural

Escolher roteiro -> ler propósito e paradas -> selecionar parada -> detalhes -> abrir trajeto externo. Roteiro ordenado não significa caminho validado entre as paradas. Não prometer duração total ou acessibilidade sem evidência.

## J-05 — Explorar e escrever uma memória

Abrir memórias -> distinguir exemplos fictícios de referências publicadas -> escolher “Escrever minha lembrança” -> preencher texto e vínculo opcional com lugar/período -> ler aviso local -> salvar -> ver a lembrança na seção pessoal -> remover quando desejar.

Texto de aviso proposto: “Esta lembrança fica só neste navegador. Ela não será publicada e pode ser apagada ao limpar os dados do navegador.” Falha de armazenamento mantém o texto para nova tentativa e não anuncia sucesso. Apelido é opcional; não pedir idade, telefone ou endereço.

## J-06 — Conhecer a trajetória do festival

Abrir linha do tempo -> escolher marco -> ler contexto e fonte -> explorar lugar relacionado, se houver associação documentada. Uma lacuna de documentação não deve ser preenchida com edições presumidas ou eventos inventados.

## Estados transversais

Sem resultados: mostrar filtros aplicados e ação para limpar. Mapa indisponível: manter lista e endereço. Lugar sem coordenada conferida: manter resultado na lista e indicar “Localização no mapa a confirmar”, sem marcador inventado. Atividade sem horário: informar pendência. Imagem indisponível: manter título e descrição. Sem memórias pessoais: convidar a escrever, sem criar prova social fictícia. Agenda com cobertura parcial: indicar recorte e pendências, sem anunciar cobertura completa.

## Sequência sugerida para o pitch

Apresentar problema como hipótese de trabalho -> mostrar entrada -> buscar uma atividade -> abrir lugar e trajeto -> mostrar descoberta cultural -> abrir um marco histórico -> salvar uma lembrança local -> explicar evolução futura.

Adaptar a duração quando a organização informar o limite. Não assumir que haverá demonstração ao vivo: preparar capturas ou gravação do fluxo efetivamente implementado como apoio, se necessário. O apoio não equivale a mapa offline nem produto conectado em tempo real.

Requisitos: [02](02-REQUISITOS.md). Critérios de mapa: [06](06-MAPA-LOCALIZACAO-E-ROTEIROS.md).

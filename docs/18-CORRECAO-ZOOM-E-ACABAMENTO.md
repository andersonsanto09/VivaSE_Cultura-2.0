# 18 — Correção dos saltos no zoom e acabamento

17/11/2026. Revisão antes da fase 4, a pedido do responsável. Referência visual: gravação enviada nesta conversa, com cerca de nove segundos; o responsável confirmou que o bug principal era a mudança abrupta de posição dos pins durante o zoom. O vídeo não foi adicionado ao repositório; quadros de inspeção ficam apenas em `tmp/video-review/`, ignorado pelo Git.

## Causa e correção

O algoritmo anterior usava distâncias projetadas a cada movimento do mapa para ativar o afastamento e escolher posições livres. Ao cruzar os limites de colisão, o deslocamento podia mudar de direção ou de anel, produzindo saltos. Havia também uma atualização React do layout em todo evento de câmera.

- Layout agora depende das referências geográficas do catálogo, sem consultar zoom ou distâncias projetadas para redistribuir os pins.
- Referências compartilhadas ou até 15 m têm um afastamento radial pequeno e fixo em pixels; limite de 64 px. Âncoras originais não são alteradas.
- A escala visual do pin continua diminuindo suavemente ao afastar; ela não reorganiza seus offsets.
- Os 20 pins continuam individuais e sem cluster. O MapLibre acompanha a câmera; o layout não é recalculado a cada quadro.
- Sobreposição residual é verificada com projeção atual apenas no clique. A lista de vizinhos mantém acesso aos espaços sem mudar zoom ou reposicionar outros pins.
- Redimensionar uma vista já visível não redefine centro, zoom ou inclinação. Ao revelar o mapa que estava oculto no celular, o enquadramento inicial ainda é aplicado.

## Acabamento visual

- Retirado o contorno escuro tracejado adicional que deixava os pins serrilhados; borda branca tracejada continua indicando referência aproximada, com foco/seleção destacados.
- Controles com ícones e acabamento plano; “Ver todos” conserva o nome acessível completo. Nenhuma mudança de paleta ou marca.
- Legenda de categorias disponível por botão na própria vista do mapa, também no celular. Estado expandido informado, Escape fecha e devolve foco.
- Aviso de referência com título e explicação curta. Detalhe do espaço com categoria colorida, precisão mais legível, horários em destaque e espaçamento revisado.
- Lista de vizinhos com símbolos de categoria, fechamento maior e leitura mais clara.

## Verificações

- Nove testes de domínio aprovados. Novo teste compara offsets com diferentes projeções/escalas para garantir que não são redistribuídos.
- `tests/map-stability.py`: reprodução de roda do mouse com MapLibre real e cartografia simulada. Na última execução, 492 quadros amostrados; maior variação medida do deslocamento relativo a duas âncoras: 1,45 px, abaixo da tolerância de 3,5 px para arredondamento de pixels. Não se aceita troca de anel/direção. A medição é de câmera plana no cenário controlado, não de todo aparelho possível.
- Mesmo teste verifica preservação de perspectiva ao redimensionar, legenda por teclado e ausência de exceções.
- Suítes de navegador, fase 3, gestos e revisão visual aprovadas: enquadramento, fallback, GPS/cópia, navegação/URL, filtros, agenda, acessibilidade e larguras móveis continuam verificados. Axe sem violações detectadas nas cinco telas daquela execução; não equivale a conformidade integral.
- Inspeção do detalhe mostrado na gravação em 1440, 768 e 390 px, com capturas revistas. Zero falhas automatizadas; avisos de quantidade de cor e margem do cabeçalho preservados por coerência com a identidade e composição atuais.
- TypeScript e build verificados; aviso do tamanho do chunk WebGL continua pendente de medição/otimização na qualidade final.

Evidências locais: `tmp/zoom-stability/`, `tmp/zoom-fix-inspect/` e os diretórios das suítes anteriores. A inspeção visual separada usa cartografia real; as suítes funcionais simulam os recursos cartográficos para não consumir a cota repetidamente.

A fase 4 permanece sem implementação. Sem novo commit/push nesta revisão até este registro; o snapshot anterior é `fe64950`. Ainda é necessária avaliação do responsável na nova versão e revisão final em aparelho físico/HTTPS.

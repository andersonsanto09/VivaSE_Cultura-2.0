# 14 — Mapa vetorial e revisão visual

16/11/2026. Resposta à avaliação do responsável: ícones precisam representar atividades e a identidade FASC deve aparecer nas telas internas, além da entrada. Mantidas as decisões de marcadores individuais e PDF fora das telas/arquivos públicos.

## Implementado

- MapLibre GL JS 6.18 e react-map-gl 8 substituem Leaflet/React Leaflet. Worker configurado para Vite; mapa permanece carregado sob demanda.
- Cartografia vetorial MapTiler Streets. Chave fornecida pelo responsável testada com origem local e resposta HTTP 200. Configurada apenas em `.env.local`, ignorado pelo Git; `.env.example` contém somente exemplo. Chaves de navegador são públicas no bundle e precisam das restrições de origem; o arquivo local evita versionar a configuração, não torna o token secreto no navegador.
- Atribuição cartográfica e logo MapTiler preservados.
- Cada espaço tem botão individual com ícone Lucide semântico e número secundário. Música, teatro, cinema, literatura, arte, patrimônio, cuidado, sustentabilidade, feira, brincadeiras e cortejos recebem símbolos adequados. O nome completo é acessível por teclado e no título do marcador; cor não é a única identificação.
- Referências geográficas originais preservadas em todos os níveis de zoom. Apenas coordenadas coincidentes recebem pequenos offsets em pixels ao aproximar; em visão distante os offsets são zerados. Os ícones diminuem ao afastar, sem dispersar pontos por outras cidades. Não se afirmam portas exatas.
- Vista inicial focada no Centro Histórico; “Ver todos os espaços” inclui também a Bica, distante do núcleo central. Não espalhar todos os pontos pelo município apenas para acomodar a primeira vista.
- Cabeçalho roxo, amarelo na composição, dias com cores da edição e ícones no catálogo/detalhe. A imagem solta acima do mapa foi retirada após avaliação. Logo oficial branca no cabeçalho extraída como quatro caminhos vetoriais da página 1 da v4, com fundo transparente, sem redesenho ou fonte substituta. Barlow Condensed nos títulos e DM Sans na leitura, hospedadas localmente via Fontsource. São fontes escolhidas para o protótipo, não alegadas como fontes oficiais do FASC.
- Lista, agenda e detalhes preservados. Sem PDF público ou links da programação em PDF nas telas.

## Escolhas das sugestões recebidas

| Opção | Decisão |
| --- | --- |
| MapLibre + react-map-gl | Implementados |
| MapTiler | Implementado e acesso local validado |
| Protomaps | Alternativa futura; não opera em paralelo com MapTiler |
| Supercluster | Excluído: contraria os marcadores individuais solicitados |
| Fontsource | Implementado, apenas subconjunto latino utilizado |
| Motion | Selecionado para transições futuras concretas, ainda não instalado |
| Vaul | Proposta para o painel móvel; ainda não integrado |
| Turf por módulos | Proposta para proximidade, ainda não integrado; distância geodésica não é trajeto caminhável |
| Sonner | Proposta para feedback futuro, ainda não integrado |
| react-i18next | Proposta após estabilizar os textos; traduções ainda não feitas |
| Tailwind/shadcn | Sem migração nesta revisão; CSS do produto preservado |
| GSAP, ScrollTrigger, SplitText, Lenis, Lottie, React Three Fiber | Adiados; não adicionar dependências sem uso concreto |
| View Transitions | Adiado; evitar duas soluções animando o mesmo fluxo |

## Verificação e limites

- Sete testes de domínio aprovados; typecheck e build aprovados após migração.
- Suíte Edge/Chromium atualizada: 20 marcadores individuais, seleção direta, agenda, busca, detalhe, falha do mapa, localização negada/permitida e retorno. Nenhuma exceção de página no percurso.
- Estilo vetorial simulado nos testes funcionais para não consumir a cota do serviço em cada execução. Inspeção visual separada com a cartografia real em 1440, 768 e 390 px.
- Auditoria npm após usar MapLibre 6.18: zero vulnerabilidades reportadas. A versão 5 inicialmente avaliada foi substituída por alerta crítico do sanitizador; não foi usado `audit fix --force`.
- Bundle do mapa aumentou com o motor WebGL e seu worker; Vite emite aviso de chunk maior que 500 kB. Carregamento sob demanda preservado; performance em aparelho físico ainda precisa ser medida na fase de qualidade.
- Prédios 3D não ativados: dependem da cobertura e dos atributos disponíveis, não apenas da biblioteca. Não foram inventadas alturas.
- Direção com mais cor e ícones expressamente solicitada pelo responsável prevalece sobre a recomendação genérica de telas administrativas neutras. A inspeção pode avisar sobre proporção de cor; não reduzir a identidade para eliminar esse aviso.
- Roteiros, memórias, linha do tempo e aceite visual definitivo continuam pendentes. Commit/push deste snapshot solicitado pelo responsável; publicação em hospedagem continua pendente.

Documentação oficial consultada: [react-map-gl](https://visgl.github.io/react-map-gl/docs/get-started), [chaves MapTiler](https://docs.maptiler.com/guides/developer/credentials/api-key/), [atribuição MapTiler](https://docs.maptiler.com/guides/map-design/attribution/add-attribution/).

## Correções solicitadas na segunda avaliação

- Causa do espalhamento ao afastar: o algoritmo antigo convertia afastamentos de tela em coordenadas geográficas a cada zoom, produzindo distâncias aparentes irreais. Substituído por âncoras fixas e offsets de tela compactos, apenas para referências coincidentes e em zoom próximo. Em visão distante, pontos coincidentes podem se sobrepor; aproximar ou usar a lista mantém acesso individual, sem agrupador.
- Ícones escalam para baixo ao reduzir zoom; números auxiliares ficam ocultos na visão geral. O teste de navegador mede a redução efetiva do marcador após cinco passos de zoom.
- Imagem horizontal solta removida. O texto genérico FASC/2026 deu lugar à logo oficial vetorial transparente em `public/images/fasc-2026-logo.svg`.
- Testes de domínio verificam igualdade entre a âncora usada e a coordenada original em todos os zooms testados, além de zerar offsets na visão distante. Suíte de navegador verifica logo, ausência da imagem solta e mantém os 20 marcadores.

## Controles de mouse e perspectiva

- Zoom pela roda habilitado. Antes estava explicitamente desativado na configuração do mapa.
- Botão do meio: segurar e arrastar altera inclinação/rotação; autoscroll do navegador é prevenido apenas nesse gesto sobre o canvas. Movimento vertical controla inclinação entre 0° e 60°, horizontal controla rotação. Eventos e estado temporário limpos ao soltar, perder foco ou desmontar.
- Botão direito + arrastar e Ctrl + arrastar permanecem como controles nativos do MapLibre; rotação, inclinação e gesto touch explicitamente habilitados.
- Controle “Inclinar mapa”/“Vista de cima” acessível por botão, inclusive no celular. Não promete modelos ou extrusões de prédios; perspectiva e dados 3D são coisas diferentes.
- Verificação em `tests/map-gestures.py`, com renderer MapLibre real e cartografia simulada: roda, botão do meio, direito, alternância de perspectiva, botão no celular, sem overflow ou exceções de página. Captura local em `tmp/phase-2-qa/map-gesture-controls-mobile.png`.

# 04 — Direção visual e design system

Referência: 16/11/2026. Direção aprovada provisoriamente pelo responsável, para revisão no protótipo. Fase 1 encerrada como planejamento; a implementação visual começou na Fase 2.

## Decisão de direção

Usar a identidade original do FASC 2026 como base da edição, mantendo VivaSE Cultura como marca do produto. Entrada vibrante com ilustrações fornecidas; mapa e painéis claros para leitura; verde para sexta, roxo para sábado e turquesa para domingo, sempre com data e rótulo textual. O responsável concordou provisoriamente e pediu refinamento após ver o protótipo.

A identidade oficial substitui as sugestões genéricas anteriores. A entrada e a interface de consulta têm composições diferentes, com a mesma família de cores. Referência de organização da interface: folha branca em moldura clara (Framed sheet), adaptada à marca existente; a biblioteca de estilo não substitui a identidade fornecida.

## Material recebido e valores de referência

Programação completa v4 com 24 páginas e três imagens da edição. Valores identificados nas formas vetoriais do PDF, sem alegar um manual oficial de marca:

| Papel de referência | Cor |
| --- | --- |
| Rosa | `#E91A8A` |
| Roxo | `#8F4197` |
| Amarelo | `#FCD726` |
| Verde | `#3CB44A` |
| Turquesa | `#1ABDC7` |
| Laranja | `#F4802A` |

As combinações com texto precisam passar por contraste. Verde, amarelo e turquesa recebem texto escuro; o roxo pode receber branco conforme medição. Não usar todas as cores na mesma superfície funcional.

O PDF identifica fontes incorporadas com os nomes Paris2024-Variable-Regular e Zorin-Regular. Não foram extraídas para uso na web nem há licença de webfont conferida. A primeira fundação usa fontes do sistema; a tipografia definitiva permanece aberta à revisão.

O painel ilustrado fornecido foi preservado como imagem local para a entrada, com crédito de origem no protótipo. Não gerar ilustrações concorrentes ou reconstruir o logotipo oficial sem necessidade. A identificação do protótipo não afirma parceria institucional.

## O que a experiência precisa comunicar

VivaSE Cultura é um guia do festival ligado à cidade. A ordem de prioridade definida pelo responsável é orientação, descoberta cultural e memória. A primeira leitura precisa explicar o evento e levar ao mapa; o conteúdo histórico aprofunda a visita sem competir com a orientação.

## Referência recebida

Os 15 prints mostram uma entrada com título serifado, azul escuro e verde, detalhes quentes e um botão central. O mapa usa fundo claro, marcadores por categoria, painel de detalhes e navegação superior no desktop; no celular, há navegação inferior e painéis sobre o mapa.

Essas escolhas são referências, não restrições aprovadas para a nova versão. Não há logotipo vetorial, manual de marca ou fontes originais fornecidos. O artefato exploratório em `.taste-skill/` foi gerado antes do alinhamento completo e não constitui direção visual aprovada.

## Problemas observáveis a resolver

- Textos e ícones pequenos em alguns painéis e na navegação mobile.
- Rótulos cortados na barra inferior; muitas funções disputam o mesmo nível.
- Painéis longos podem esconder o mapa e ações importantes.
- Contraste baixo em partes da entrada e dos filtros.
- Identificação e localização atual não aparecem como ações centrais nos prints.

São observações das imagens, sem teste no produto antigo ou comprovação de impacto em uso real.

## Critérios para qualquer direção

1. Nome do produto e edição reconhecíveis.
2. Mapa legível, marcadores distinguíveis por símbolo e texto, além da cor.
3. Busca, localização e saída do detalhe fáceis de encontrar.
4. Tipografia legível no celular, com contraste medido e zoom preservado.
5. Vocabulário direto: “Mapa”, “Programação”, “Como chegar”, “Minha lembrança”.
6. Identidade sergipana baseada em conteúdo e referências reais da cidade; evitar decorar tudo com estereótipos.
7. Fotografias com origem e direito de uso revisados. Ilustração, se escolhida, não deve se passar por registro histórico.
8. Avisos de ficção e armazenamento local próximos ao conteúdo correspondente.

## Refinamento após o primeiro protótipo

- Avaliar a força da identidade da edição na entrada e a legibilidade no mapa.
- Refinar a marca VivaSE sem confundi-la com o logotipo do festival.
- Escolher tipografia web definitiva com licença adequada.
- Conferir densidade, navegação e painéis em celular com o responsável.

O primeiro protótipo é a base concreta para essa avaliação; o aceite provisório não encerra o refinamento visual.

## Fundação proposta, sem valores finais

Tokens semânticos para fundo, superfície, texto, texto secundário, borda, foco, ação, categorias e avisos. Escala única de espaçamento, tipografia e raios. Cores de categoria estáveis entre mapa, filtros e detalhes; texto permanece necessário para identificação.

Componentes a especificar: botão, campo de busca, filtro, seletor de dia, marcador, lista de lugares, cartão de atividade, painel de detalhe, mensagem de erro/vazio, memória e item de linha do tempo. Cada um contempla foco, toque, seleção, indisponibilidade e conteúdo longo.

Layouts a discutir: entrada, mapa com lista, detalhe de lugar, agenda, roteiro, memórias, formulário local e linha do tempo. Desktop e celular exigem composições próprias, compartilhando o mesmo conteúdo.

## Revisão visual planejada

Conferir primeira leitura, contraste, mapa visível, ausência de conteúdo coberto e texto cortado em 390, 768 e 1440 px. Revisar também teclado, zoom e movimento reduzido. Emulação não substitui conferir ao menos um celular físico disponível; essa verificação só será declarada após execução real.

Documentos relacionados: [05](05-EXPERIENCIA-E-JORNADAS.md), [07](07-QUALIDADE-E-ACESSIBILIDADE.md) e [08](08-ESTRATEGIA-DE-TESTES.md).

# 04 — Direção visual e design system

Referência: 16/11/2026. Briefing para a próxima conversa de design. Paleta, fontes, imagens e composição ainda não estão aprovadas. Nenhuma tela implementada.

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

## Conversa de design a realizar

- Quanto da identidade anterior manter: cores, nome composto, símbolo e tipografia?
- A apresentação deve se aproximar mais de um guia turístico, de uma publicação cultural ou de um festival contemporâneo?
- Quais referências visuais o responsável gosta e rejeita?
- Qual composição atende melhor à entrada: cidade, festival, mapa ou combinação dos três?
- Como distribuir navegação e painéis no celular sem perder contexto?

Apresentar propostas visuais concretas depois dessa conversa. Não transformar essas perguntas em decisões automáticas.

## Fundação proposta, sem valores finais

Tokens semânticos para fundo, superfície, texto, texto secundário, borda, foco, ação, categorias e avisos. Escala única de espaçamento, tipografia e raios. Cores de categoria estáveis entre mapa, filtros e detalhes; texto permanece necessário para identificação.

Componentes a especificar: botão, campo de busca, filtro, seletor de dia, marcador, lista de lugares, cartão de atividade, painel de detalhe, mensagem de erro/vazio, memória e item de linha do tempo. Cada um contempla foco, toque, seleção, indisponibilidade e conteúdo longo.

Layouts a discutir: entrada, mapa com lista, detalhe de lugar, agenda, roteiro, memórias, formulário local e linha do tempo. Desktop e celular exigem composições próprias, compartilhando o mesmo conteúdo.

## Revisão visual planejada

Conferir primeira leitura, contraste, mapa visível, ausência de conteúdo coberto e texto cortado em 390, 768 e 1440 px. Revisar também teclado, zoom e movimento reduzido. Emulação não substitui conferir ao menos um celular físico disponível; essa verificação só será declarada após execução real.

Documentos relacionados: [05](05-EXPERIENCIA-E-JORNADAS.md), [07](07-QUALIDADE-E-ACESSIBILIDADE.md) e [08](08-ESTRATEGIA-DE-TESTES.md).

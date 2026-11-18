# 25 — Refinamento visual e acervo fotográfico

Revisão de 17/11/2026, autorizada após análise das telas publicadas. Mantém Cartaz vivo + Atlas cultural, fontes, marcas, largura da foto da Home e paleta aprovada do FASC.

## Aplicação

- Home: abertura ajustada para duas linhas no desktop; seção editorial com fotografia da cidade, depoimento já publicado com fonte/autoria e trajetória de The Baggios. Rotas, memórias e história continuam acessíveis.
- Artistas: nove fotografias oficiais identificadas e conferidas visualmente; composições tipográficas para os demais nomes e para falhas de carregamento. Retratos têm ano, fonte e crédito; não representam participação em 2026. Nova ordenação “Seleção VivaSE”, preservando ordenação por nome/ano, filtros, paginação e dados existentes.
- Detalhe de local: fotografia maior abre o painel no desktop; no celular o nome antecede a foto para identificar o lugar imediatamente. Endereço, precisão, programação, memória do palco e fontes mantidos.
- Programação: linhas comuns mais compactas, horários fortes e ações laterais refinadas. Dois destaques editoriais por dia (música e artes cênicas), identificados como Seleção VivaSE, sem remover ou duplicar atividades na lista. Fotos são dos espaços/edições anteriores, com contexto visível; não foram usadas como retratos de atrações de 2026.
- Mapa: miniaturas reais nos 20 itens da lista, ícone de categoria sobreposto, ano ativo em cápsula e distinção entre festival atual e acervo. Pins, coordenadas, aproximação geográfica e controles preservados.
- Microinterações discretas por CSS; estados de teclado mantidos em controles interativos; movimento reduzido respeitado. Sem dependências novas.

## Fotografias dos artistas

Metadados completos em `src/data/artist-photos.ts`, arquivos em `public/images/artists/`.

| Artista | Registro | Crédito publicado |
|---|---|---|
| Alceu Valença | FASC 2022 | Fernando Correia e Dani Santos / Prefeitura |
| The Baggios (Julico) | FASC 2022 | Fernando Correia e Dani Santos / Prefeitura |
| Marina Lima | FASC 2024 | Heitor Xavier / Prefeitura |
| BaianaSystem (Russo Passapusso) | FASC 2024 | Heitor Xavier / Prefeitura |
| Filipe Catto | FASC 2024 | Dani Santos / Prefeitura |
| Lamparina | FASC 2024 | Dani Santos / Prefeitura |
| Gaby Amarantos | FASC 2025 | Julia Rodrigues / Prefeitura |
| Karol Conká | FASC 2025 | Markus Mello / Prefeitura |
| Olodum | FASC 2025 | Julia Rodrigues / Prefeitura |

As associações foram feitas pelo texto/legenda da reportagem e pela conferência visual da imagem. Atribuição mantida; não se declara licença irrestrita. Não foram geradas fotos artificiais de artistas ou locais. A composição tipográfica é explicitamente visual, sem simular retratos.

## Verificação

- 28 testes de domínio aprovados.
- Suíte de roteiros/memórias/fotos aprovada.
- Suíte histórica: navegação, reprodução, configurações por edição, precisão, fotos e acessibilidade.
- Suíte `tests/art-polish.py`: links editoriais da Home, nove imagens, proporções, créditos, falha de foto, miniaturas, agenda com 51 itens em 21/11 e dois destaques, seis telas em 1440/768/390/320 sem overflow; axe nos seis recortes móveis.
- TypeScript e build de produção aprovados. Permanece o aviso de tamanho do bundle MapLibre, já carregado sob demanda.

Capturas e resultados locais em `tmp/art-polish` (não versionados). Publicação solicitada no fluxo autorizado; aceite visual desta revisão e teste final em aparelho físico continuam pendentes.

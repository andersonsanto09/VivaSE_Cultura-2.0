# 36 — Plataforma cultural de São Cristóvão

Revisão: 20/11/2026.

O VivaSE passa a ter uma camada de plataforma acima da aplicação do FASC. A nova Home apresenta São Cristóvão e dá acesso a experiências independentes. A primeira é o FASC, que continua completo. A segunda é a Festa de Nosso Senhor dos Passos.

## Princípio

A plataforma acrescenta uma camada e não reconstrói nada. A aplicação do FASC (`src/App.tsx` e tudo o que ela importa) continua com seu roteador, cabeçalho, estilos, mapa, programação, cultura, linha do tempo, artistas e memórias. Ela agora é carregada sob demanda pelo roteador da plataforma.

## Rotas

| Endereço | Conteúdo |
| --- | --- |
| `#/` | Nova Home do VivaSE (portal) |
| `#/?secao=experiencias`, `descubra` | Home com rolagem até a seção |
| `#/fasc` | Home original do FASC |
| `#/mapa`, `#/programacao`, `#/cultura`, `#/roteiros`, `#/memorias`, `#/historia`, `#/artistas`, `#/sobre` | Rotas originais do FASC, sem alteração |
| `#/fasc/<página>?…` | Alias de compatibilidade: redireciona (`replaceState`) para `#/<página>?…` |
| `#/publicacoes` | Índice das publicações |
| `#/publicacoes/<slug>` | Leitura completa |
| `#/senhor-dos-passos` | Home da experiência Senhor dos Passos |
| `#/senhor-dos-passos/<seção>` | `historia`, `tradicoes`, `galeria`, `lugares`, `programacao` |
| Outros | Página “não encontrada” da plataforma |

As rotas internas do FASC foram mantidas sem prefixo. Assim, links compartilhados, QR codes, o roteiro de pitch e os testes existentes continuam válidos. Só o endereço raiz mudou de destino: antes abria o FASC, agora abre o portal. Os testes de navegador que esperavam a Home do FASC em `BASE` passaram a usar `BASE + '#/fasc'`.

A lógica de rotas é uma função pura em `src/platform/routes.ts`, coberta por `tests/platform.test.ts`. Um teste lê `src/App.tsx` e falha se o FASC ganhar uma página que a plataforma não conhece.

## Mudanças no FASC

- A marca VivaSE do cabeçalho e do rodapé vem do componente compartilhado `src/components/Brand.tsx` e leva à Home da plataforma. É o acesso discreto de retorno; o layout não muda.
- O logotipo FASC 2026, no canto do cabeçalho, virou link para `#/fasc`, com área de toque de 44 px.
- Uma seta circular flutua no canto superior esquerdo do primeiro banner de cada página de evento (FASC e Senhor dos Passos), em `src/components/BackLink.tsx`. Ela volta à página anterior do VivaSE pelo histórico do navegador. Se a página foi aberta direto por link, ela leva à seção Experiências. A profundidade de navegação fica em `history.state` (`src/platform/navigation.ts`), e as chamadas `replaceState(null)` dos filtros do FASC mantêm essa marca. Os banners que começam logo abaixo do cabeçalho ganharam espaço extra no topo, só quando a seta está presente.
- `go('inicio')` passou a apontar para `#/fasc`. A função não é chamada com esse valor hoje, mas fica consistente.

Nenhum componente, estilo ou dado do FASC foi removido ou simplificado.

## Estrutura

```
src/platform/
  Platform.tsx          roteador da plataforma (carrega FASC, portal e módulos)
  routes.ts             rotas puras e construtores de links
  platform.css          estilos do portal (prefixo vs-), carregado após o CSS do FASC
  components/           Brand reutilizado, cabeçalhos, rodapé, cards, figura com crédito, fontes
  pages/                PortalHome, PostsIndex, PostPage, NotFound
  content/              dados: experiences, posts, places, images, sources
src/experiences/passos/ módulo Senhor dos Passos (content.ts, PassosExperience.tsx, passos.css)
```

Os conteúdos são dados tipados, separados dos componentes. Publicações usam blocos (`paragraph`, `heading`, `figure`, `note`, `links`) e podem passar a vir de um CMS ou API com o mesmo formato.

## Reaproveitamento visual

O portal usa os tokens de `styles.css` (roxo, roxo profundo, amarelo, tipografia Barlow Condensed + DM Sans, raios e curvas de animação) e os componentes de estilo existentes: `.site-header`, `.brand`, `.button`, `.text-action`, `.eyebrow`, `.ribbon-star` e todo o sistema `.home-footer`. A composição é própria: hero fotográfico de largura total, cards grandes de experiência, grade editorial e trilha horizontal de lugares no celular.

O cabeçalho do Senhor dos Passos segue a anatomia do cabeçalho do FASC: marca VivaSE, menu inline (História, Tradições, Lugares, Agenda) e emblema à direita, que leva ao início da experiência. O restante tem identidade própria dentro da mesma gramática: violeta profundo, creme e dourado, com uma arte abstrata de portal e degraus (`PassosArt`). A arte substitui fotografias até que imagens com crédito e autorização sejam curadas.

## Como adicionar uma experiência

1. Acrescentar uma entrada em `src/platform/content/experiences.ts`. O card aparece na Home e no rodapé.
2. Se a experiência tiver módulo próprio, incluir o slug em `experienceModules` (`routes.ts`) e o componente em `Platform.tsx`. Usar `ExperienceHeader` para a navegação.
3. Se a experiência for uma aplicação existente, como o FASC, apontar `href` para ela, sem duplicar funcionalidades.

## Conteúdo e fontes

Regra mantida de `FONTES-E-CURADORIA.md`: nenhum fato sem fonte. Temas sem fonte verificável ficam como “em curadoria”, sem texto.

Fontes consultadas em 20/11/2026:

- [IPHAN — Patrimônio Mundial em Sergipe](https://www.gov.br/iphan/pt-br/superintendencias/sergipe/patrimonio-mundial): formação da Praça São Francisco entre 1580 e 1640, inscrição em 2010 e edifícios do entorno.
- [Prefeitura — programação da Romaria de Senhor dos Passos 2025](https://www.saocristovao.se.gov.br/noticia/romaria-de-senhor-dos-passos-acontece-na-proxima-semana-em-sao-cristovao-confira-a-programacao): trasladação noturna, procissão de penitência, raízes no século XVII com os carmelitas e declaração como patrimônio imaterial de Sergipe em 2015.
- [Prefeitura — último dia da Romaria 2025](https://www.saocristovao.se.gov.br/noticia/ultimo-dia-da-romaria-de-senhor-dos-passos-reune-milhares-de-fieis-no-centro-historico-de-sao-cristovao): segundo fim de semana da Quaresma, Procissão do Encontro (Carmo e Matriz), encontro na Praça São Francisco, cântico da Verônica, cerca de 70 mil devotos e organização da Arquidiocese de Aracaju.
- Fontes já usadas no FASC (`src/data/cultural-sources.ts`, `src/data/history.ts`) para museus, Casa das Culturas Populares e trajetória do festival.

Não foram afirmados: ano de fundação da cidade, data da transferência da capital e tombamento federal do conjunto. As páginas oficiais consultadas (UNESCO e IBGE) recusaram o acesso automatizado e não havia outra fonte primária conferida. O tema “São Cristóvão e sua importância para Sergipe” ficou em curadoria.

A programação do Senhor dos Passos está vazia de propósito (`passosSchedule = null`). Datas, horários e percursos de edições futuras só entram após publicação oficial. Descrições de 2025 aparecem identificadas como tal.

## Verificação

- `npm test`: 52 testes passaram, incluindo 10 da plataforma (rotas, compatibilidade com o App, fontes, imagens existentes, links internos, coordenadas e ausência de programação inventada).
- `npm run typecheck` e `npm run build`: sem erros. O aviso de chunk acima de 500 kB vem do mapa do FASC (`MapView`, maplibre), que não foi alterado.
- Navegador (Vite dev, 320 px, 375 px e 1280 px): Home, publicações, leitura, não encontrada, módulo Senhor dos Passos (seis seções), Home do FASC e as rotas `mapa`, `mapa?modo=historico`, `programacao`, `cultura`, `roteiros`, `memorias`, `historia`, `artistas` e `sobre`, além dos aliases `#/fasc/...`. Nenhuma das páginas visitadas teve rolagem horizontal.
- Os testes Python/Playwright não foram executados neste ambiente (o pacote `playwright` não está instalado).

## Próximos passos sugeridos

- Curadoria de fotografias da romaria com autor e autorização, e publicação da programação oficial quando divulgada.
- Fontes primárias para os temas em curadoria (história de São Cristóvão, personalidades, gastronomia, curiosidades).
- Mapa cultural da cidade a partir de `cityPlaces`, que já tem coordenadas reaproveitadas do levantamento do FASC.
- Teste de navegador da plataforma no mesmo padrão dos testes Playwright existentes.
- Conectar `posts.ts` a um CMS ou API mantendo o formato de blocos.

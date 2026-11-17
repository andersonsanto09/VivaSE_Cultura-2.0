# VivaSE — pacote consolidado de pesquisa histórica para Codex

**Atualizado em 17/11/2026.** Este arquivo acompanha `VivaSE_FASC_Acervo_Consolidado_1972_2025.json` e `VivaSE_FASC_Participacoes_Completas.csv`.

## Conteúdo do pacote

- **212 participações ou vínculos artísticos**: 177 da pesquisa anterior + 35 registros adicionados nesta ampliação, incluindo nomes de edições históricas não exibidas anteriormente e nomes sem data de edição.
- **125 registros de espaço** nas nove edições da pesquisa geográfica anterior. Esses endereços são predominantemente referências textuais e não coordenadas verificadas.
- **16 anos com ao menos uma participação registrada**, mais 13 registros históricos sem data individual confirmada.
- A edição **2005 = 33ª** é confirmada. O festival foi retomado em **2017 = 34ª**.

## Comando para o Codex (copiar e enviar)

> Implemente a atualização histórica do VivaSE usando o arquivo JSON anexo como fonte estruturada e o CSV para auditoria manual. Leia os arquivos e a arquitetura existente antes de modificar o código. Preserve todos os dados atuais, compare por nome normalizado + ano + linguagem + espaço + atividade, e faça um merge seguro sem sobrescrever registros com evidência mais forte.
>
> **Artistas em novas edições:** incluir 1984 (13ª), 1985 (14ª), 1988 (17ª), 1989 (18ª), 1990 (19ª), 1991 (20ª) e 1993 (22ª). A base também traz contexto do FASC de 1973 e 1992, mas os nomes nesses anos têm estados de evidência específicos. Não assumir que todos os anos entre 1972 e 2025 tiveram festival.
>
> **Seção Cultura > Quem já passou por aqui:** criar catálogo pesquisável por nome, linguagem, ano, edição e status. Artistas de edições não representadas geograficamente devem aparecer no catálogo histórico mesmo sem marcador no mapa. Para nomes citados pelo IPHAN sem ano, mostrar **“Edição ainda não identificada”**; não inventar o ano, o palco ou o local.
>
> **Página de artista:** mostrar todas as participações com o estado da evidência (“programado”, “show documentado”, “citado em pesquisa histórica”, “ano a confirmar”). Mesmos artistas podem reaparecer em várias edições. Artista + ano + manifestação é uma ocorrência, não uma biografia repetida.
>
> **Mapa histórico:** mostrar marcador apenas quando o espaço histórico e sua localização estiverem suficientemente verificados. Os registros com `adicionar_pin_automaticamente: false` NÃO devem gerar pins a partir do nome do artista ou de uma praça atual. Quando o palco for desconhecido, mostrar a participação apenas em lista. O catálogo do mapa pode exibir a edição sem localização, mas nunca centralizar coordenadas fictícias.
>
> **Filtro de edição:** construir a partir das edições documentadas, não do intervalo de anos corridos. A existência de artistas documentados para 1984, 1988 ou 1990 permite criar uma entrada **histórica informativa** para essas edições, ainda que seus pontos geográficos estejam pendentes.
>
> **Fontes e integridade:** mostrar fonte clicável em cada registro. Diferenciar programado de realizado. Não exibir como apresentação realizada: **Elba Ramalho (1988, cancelada), Gal Costa (2022, show não ocorreu), Waly Salomão (1992, convite sem comparecimento confirmado), Jorge Amado (1973, lançamento documentado indiretamente sem prova de presença)**. Essas ocorrências estão em `pendencias_e_ausencias` para curadoria, fora de `participacoes` com edição atribuída.
>
> **Edição 2026:** em 17/11/2026 ainda não ocorreu. Não usar os nomes programados para o 41º FASC na seção “já passaram”. Podem constar na programação atual do aplicativo com a classificação de evento futuro.
>
> **Interface:** manter a identidade visual do VivaSE, preservar a programação 2026, fazer a aba Cultura conversar com o mapa, criar estados vazios para anos sem localização, e manter acessibilidade/mobile. Não incluir imagens de artistas sem autorização/licença. Adicionar testes para status, duplicatas, filtros e deep-links.
>
> **Entrega:** mostrar quantidade de registros importados/mesclados, nomes sem ano, dados com palco confirmado, pendências, fontes, arquivos modificados e testes executados. Não declare que verificou individualmente fatos apenas porque o JSON os contém; preserve os campos de proveniência e registre qualquer conflito.

## NOVOS REGISTROS DA PESQUISA AMPLIADA

### 1984 — 13ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Sivuca | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |

### 1985 — 14ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Chico Queiroga | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Grupo Cataluzes | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |

### 1988 — 17ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Olodum | música afro-brasileira | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Wagner Tiso | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Paulinho da Viola | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Dominguinhos | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Pepeu Gomes | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Geraldo Azevedo | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Chico Queiroga | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Tonho Baixinho | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |

### 1989 — 18ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Alceu Valença | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |

### 1990 — 19ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Jards Macalé | música | realizada testemunho | não documentado | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Tunai | música | convite confirmado pelo organizador | não documentado | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Sebastião Tapajós | música | convite confirmado pelo organizador | não documentado | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Maurício Tapajós | música | convite confirmado pelo organizador | não documentado | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Cláudio Nucci | música | convite confirmado pelo organizador | não documentado | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |

### 1991 — 20ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Nando Cordel | música | programado | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Zezé Motta | música | realizada referencia historica | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |

### 1993 — 22ª edição
| Artista/grupo | Atividade | Evidência | Palco/posição | Fonte |
|---|---|---|---|---|
| Moraes Moreira | música | programado | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Chico Queiroga | música | programado | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |
| Amorosa | música | programado | não documentado | [Fonte](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) |

### Participações históricas citadas sem edição/ano confirmado
| Nome | Linguagem | Fonte |
|---|---|---|
| Dona Ivone Lara | samba | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Nelson Cavaquinho | samba | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Jorge Amado | literatura | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Ariano Suassuna | literatura | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Carlos Lyra | música | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Moreira da Silva | samba | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Arrigo Barnabé | música | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Djalma Muniz de Brito | literatura | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Waly Salomão | literatura | [Fonte](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) |
| Luiz Carlos Vinhas | música | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Balé Stagium | dança | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Clyde Morgan | dança | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |
| Grupo Primeiro Ato | dança | [Fonte](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) |

## Cuidados históricos e curadoria

1. A fonte oficial [IPHAN](https://www.gov.br/iphan/pt-br/assuntos/noticias/lei-rouanet-fomenta-realizacao-festival-de-artes-de-sao-cristovao) cita grandes nomes das artes e da literatura sem especificar edições. **Não** atribuir a esses nomes o ano da edição atual.
2. A [dissertação da UFS](https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf) permite identificar atrações das décadas de 1980 e 1990, além de indicar cancelamentos. Trata-se de pesquisa histórica baseada em acervos da universidade e jornais.
3. O [depoimento de Luiz Eduardo Oliva](https://www.articulistas.com.br/post/macal%C3%A9-tr%C3%AAs-vezes-em-sergipe) indica quais artistas foram escolhidos para 1990 e relata a apresentação de Jards Macalé. Diferencie escolha/convite de show efetivo.
4. A pesquisa de espaços existente é uma **amostra não exaustiva**, não uma cartografia verificável de cada estrutura temporária.
5. A duplicidade aparente de Arnaldo Antunes em 2024 deve ser preservada porque são **duas participações distintas**: show e atividade literária.
6. O nome do palco Gal Costa em 2022 homenageia a artista; não comprova um show da cantora naquela edição.
7. Não inserir Caetano Veloso, Milton Nascimento, Chico Buarque e outros apenas porque tiveram músicas interpretadas por participantes ou foram citados em homenagens.

## Arquivos de entrada relacionados

- `VivaSE_FASC_Acervo_Consolidado_1972_2025.json` — acervo consolidado com edições, locais, participações, status e fontes
- `VivaSE_FASC_Participacoes_Completas.csv` — tabela plana para revisão editorial
- `fasc_edicoes_espacos_1972_2025.json` — pesquisa original de lugares (também incluída no ZIP)
- `dossie_fasc_para_codex.md` — dossiê textual de espaços (também incluído no ZIP)

**Limitação da pesquisa:** o número real de participações do festival é muito maior. A lista é um corpus inicial com rastreabilidade de fontes, não a programação completa de todas as edições desde 1972.

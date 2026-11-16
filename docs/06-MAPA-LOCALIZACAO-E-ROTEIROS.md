# 06 — Mapa, localização e roteiros

Referência: 16/11/2026. Diretriz funcional: cobrir todos os espaços com atividades do FASC 2026; navegação até destinos em aplicativo externo foi aceita pelo responsável.

## Inventário completo antes de afirmar cobertura completa

Criar lista mestra a partir da programação oficial de 2026 e das publicações complementares mais recentes. Campos: nome oficial e aliases, atividade, tipo de espaço, endereço, coordenada ou geometria, fonte, consulta, precisão, revisão e situação de inclusão. Cruzar repetição de nomes para não contar o mesmo lugar duas vezes.

Incluir espaços de atividades artísticas, inovação, sustentabilidade, feiras e outras ações vinculadas ao festival; não limitar o inventário a shows. Atividades itinerantes precisam de referência de saída, área ou percurso documentado. Se não houver localização exata, mantê-las na programação com referência conhecida e pendência visível.

A lista é o inventário completo do conteúdo; o mapa representa apenas as posições e geometrias conferidas. Filtros agem sobre o mesmo conjunto editorial, mas a interface distingue total de resultados, resultados localizados e itens com posição pendente. Não exigir um marcador pontual para toda entidade.

Banheiros, postos de saúde, apoio e acessibilidade exigem fonte específica da edição. Não inventar posições com base em praças próximas nem herdar coordenadas de anos anteriores sem confirmação. Toda lacuna fica registrada para pesquisa e revisão com o responsável.

## Geolocalização

Usar API do navegador somente após ação do visitante. Tratar permissão negada, posição indisponível, timeout e contexto sem suporte. A especificação requer condições de segurança e permissão; revisar no ambiente real de apresentação, especialmente páginas incorporadas ou acesso de celular por rede local.

Mostrar precisão quando útil e não interpretar GPS como posição exata dentro de um palco. Posição atual fica em memória de sessão; não anexar coordenadas à lembrança pessoal nem enviá-las ao repositório. Encerrar eventual observação contínua ao sair da função; obter uma posição sob demanda é a proposta inicial mais simples.

Sem permissão, a pessoa continua encontrando lugares, lendo endereço e abrindo o destino externo. O serviço externo pode solicitar sua própria localização.

## Mapa base

Leaflet e React Leaflet renderizam a camada geográfica; não são o provedor dos tiles nem um motor de rotas. A camada base precisa de atribuição visível, termos adequados, teste de carga de uso esperado e tratamento de falha.

O serviço público padrão do OSM tem disponibilidade sem garantia e proíbe pré-carregamento de mapas para uso offline. Não criar download de cidade ou testes que percorram automaticamente a área para coletar tiles. A escolha final do provedor será registrada na fundação técnica. Dados e apresentação dos lugares devem funcionar mesmo se o fundo cartográfico falhar.

## Como chegar

Um botão informa que abrirá outro aplicativo/site. Destino deve usar coordenada revisada ou endereço identificado; copiar endereço é alternativa. Não construir URL de percurso para um ponto geográfico pendente como se estivesse conferido. Validar URL conforme documentação do fornecedor escolhido antes de implementar.

Rotas externas não garantem bloqueios temporários, lotação ou acesso permitido na edição. Não afirmar “rota acessível” sem verificação específica. Se for necessário exibir distância em linha reta, nomeá-la assim; ela não substitui distância caminhável ou tempo de trajeto.

## Roteiros culturais

Seleção editorial de paradas existentes, com motivo para visitar e ordem sugerida. São roteiros do VivaSE, salvo quando houver fonte para um roteiro oficial. Não prometer duração, horário de funcionamento ou acesso gratuito de um equipamento apenas por ele aparecer na programação.

## Agenda e passagem da meia-noite

Separar dia de programação do instante de início. Quando a fonte listar 01h sob sexta-feira, conferir se corresponde à madrugada do sábado e registrar essa interpretação. Preservar o agrupamento do festival e comunicar a data civil de forma compreensível. Fuso: `America/Sao_Paulo`.

Se o término não for divulgado, não derivar duração ou “acontecendo agora” de um valor inventado. A informação é uma fotografia editorial conferida em determinada data, não transmissão ao vivo.

## Fontes técnicas

[W3C — Geolocation](https://www.w3.org/TR/geolocation/). [OSMF — Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/). Registro editorial e fontes do evento: [FONTES-E-CURADORIA](FONTES-E-CURADORIA.md). Testes: [08](08-ESTRATEGIA-DE-TESTES.md).

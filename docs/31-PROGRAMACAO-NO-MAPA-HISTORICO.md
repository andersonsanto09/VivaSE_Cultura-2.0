# Programação no mapa histórico — 18/11/2026

O vídeo de avaliação mostrou que clicar em um espaço histórico levava a um painel com o dossiê da edição antes da programação. Cada participação repetia edição, nome do palco e informações de contexto, tornando a agenda difícil de encontrar e comparar.

## Fluxo implementado

- No computador, clicar em um pin abre um resumo com fotografia disponível, nome, endereço, até dois registros com data/horário quando conhecidos e acesso direto a **Ver programação** e **Ver detalhes**.
- **Ver programação** abre o painel naquele espaço. A agenda aparece primeiro, agrupada pelas datas escritas nas fontes e com filtros por data. Horários conhecidos têm destaque visual.
- **Ver detalhes** abre **Sobre o espaço**, com foto, contexto do local, precisão geográfica e referências. O texto geral da edição não reaparece neste painel.
- No celular, tocar no pin abre diretamente a programação para evitar uma prévia sobreposta ao mapa pequeno. Os botões de mapa e programação permitem alternar a visualização.
- Na visão geral, **Sobre esta edição** reúne o contexto cultural e as fontes em uma seção expansível. A lista de espaços fica acessível sem atravessar o dossiê.
- Links compartilhados, navegação do navegador e links vindos dos artistas abrem o espaço diretamente. Trocar de edição limpa a seleção anterior.
- A caixa invisível de um marcador deixa de interceptar o toque em outro pin; a área interativa acompanha o botão visível. A seleção de espaços próximos continua disponível quando há sobreposição real.

## Integridade histórica

Não foram acrescentados horários, apresentações ou coordenadas. A data civil e o dia do festival continuam identificados por registro. A madrugada é ordenada depois da noite quando a fonte usa um dia de programação; datas civis conservam sua ordenação civil. Registros sem data ou horário permanecem explícitos.

Status, contexto, incertezas e fontes continuam disponíveis em **Detalhes e fontes** de cada participação. Um espaço sem apresentações cadastradas recebe uma explicação e mantém suas informações geográficas disponíveis.

## Verificação

- 40 testes do domínio e build de produção.
- Fluxo completo: pin → resumo → programação / informações do espaço → lista.
- Filtros por data, fontes por participação, links diretos e troca de edição.
- Estado vazio, locais sem coordenadas e datas/horários ausentes.
- Regressão da máquina do tempo e das 18 edições.
- Reflow em 1440, 768, 390 e 320 px; verificação com axe e navegação por teclado.

Testes de interface: `tests/history-map-agenda.py` e `tests/history-browser.py`.

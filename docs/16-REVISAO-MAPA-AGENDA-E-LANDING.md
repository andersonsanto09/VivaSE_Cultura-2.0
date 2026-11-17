# 16 — Revisão do mapa, programação e entrada

**Registro histórico:** a experiência agrupada abaixo foi substituída pelos pins individuais do [documento 17](17-PINS-INDIVIDUAIS-E-PROXIMOS-PASSOS.md). Demais melhorias permanecem.

16/11/2026. Revisão solicitada após o encerramento dos fluxos de orientação. A recomendação anterior de evitar agrupamento foi substituída explicitamente pelo responsável, que aprovou agrupamento/expansão ao observar a concentração real dos espaços. O escopo cultural da fase 4 continua pendente.

## Mapa

- Agrupamento por proximidade na tela, incluindo coordenadas coincidentes e referências próximas distintas. Componentes conexos são calculados sobre pontos projetados pelo MapLibre; rotação e inclinação entram nessa projeção. Para este catálogo de 20 registros, a implementação local evita outra biblioteca e resolve colisões entre marcadores HTML; não foi alegado uso de Supercluster ou do clustering nativo GeoJSON.
- Grupos na visão distante mostram quantidade de espaços. Selecionar aproxima; em zoom próximo, a expansão radial (*spiderfy*) apresenta ícones separados e ligados às referências. Cada espaço continua acessível diretamente pela lista, por busca e pelos filtros.
- Âncoras geográficas originais preservadas; deslocamento da expansão é em pixels. Durante a expansão, outros grupos ficam ocultos para evitar novas colisões. “Recolher” retorna à visão agrupada.
- Enquadramento inicial e “Ver todos os espaços” usam limites das referências e padding adaptado às dimensões/controles do mapa, incluindo a Bica. Marcadores que ficariam cortados são omitidos na borda durante navegação; na vista inicial, a cobertura dos 20 registros foi verificada.
- Número auxiliar removido dos pins comuns, mantido na lista e no selecionado. O número no círculo de grupo é a quantidade de espaços, não o identificador de um lugar.
- Cinco cores semânticas, iguais em chips, pins, lista, cards e agenda: música amarelo; artes cênicas roxo; cultura/formação ciano; feiras/experiências laranja; cortejos verde. Ícones e rótulos identificam categorias sem depender só de cor.
- Contorno tracejado para referência aproximada de praça/rua/saída e palco dentro do parque; mensagem explícita no detalhe. Contorno sólido identifica referência de equipamento, sem garantir porta ou acesso exato.
- Camadas `symbol` com `source-layer: poi` do MapTiler Streets ficam ocultas. Foram identificadas 11 camadas de POI (Food, Shopping, Culture etc.); vias e rótulos de lugares permanecem. Cartografia e atribuição mantidas.

## Entrada e identidade

- Tracking negativo retirado do título principal; títulos de seção usam a fonte display.
- A arte original é preservada; a apresentação recorta apenas a borda externa escura e suaviza os cantos por CSS, sem redesenhar a identidade ou modificar o arquivo recebido.
- Segunda seção com fundo ligado à paleta, detalhe gráfico e cinco cards coloridos com ícone. Cada card abre o mapa com sua categoria aplicada; contagens derivadas do catálogo.
- Rodapé roxo escuro, texto claro e maior. Cores dos dias consistentes em toda a aplicação: sexta verde, sábado roxo, domingo ciano.
- Ícones da lista receberam círculos com a cor de categoria; observação extensa de precisão removida das linhas e mantida no detalhe/legenda.

## Programação

- Chips por categoria, busca e espaço combináveis, preservados na URL e no retorno do detalhe.
- Select de espaço e accordion de participantes substituídos por Radix, estilizados para o produto, com suporte de teclado e foco. Nenhum novo motor de animação instalado para essa troca.
- Selo/ícone por categoria e destaque de atividades em andamento.
- “Acontecendo agora” usa o relógio do aparelho, fuso America/Sao_Paulo e intervalos publicados, incluindo madrugada. Se acionado durante o festival, seleciona o dia de programação correspondente; trocar o dia sai desse modo. Atualização a cada 30 segundos.
- Atividades sem término não são consideradas em andamento; não se inventa duração de shows. A interface informa esse limite, o relógio usado e a ausência de atividade quando fora dos dias do festival. Janelas gerais de espaços não são confundidas com horários individuais de atrações.

## Verificações

- Oito testes de domínio: horários/madrugada, intervalos, busca, registros sem posição, agrupamento/expansão sem alterar fontes, “agora” com término obrigatório, cobertura e integridade.
- `tests/visual-review.py`: soma dos grupos/pontos cobre 20 registros e cabe no mapa inicial; expansão sem sobreposição dos ícones; número apenas no selecionado; cinco cards filtram categorias; select/accordion funcionam; “agora” com relógio fixado; cores dos dias iguais no mapa/agenda; ausência de overflow em 1440, 768, 390 e 360 px.
- Suítes anteriores de navegador, fase 3 e gestos adaptadas e aprovadas. Nenhuma exceção de página. Axe nas cinco telas verificadas: sem violações detectadas nem itens inconclusivos naquela execução; não se declara conformidade integral.
- Capturas de entrada, agenda, lista, mapa e reflow inspecionadas; cartografia real revista nas três larguras em `tmp/review-map-inspect/`. Testes funcionais usam cartografia simulada; atividade em andamento nos testes usa relógio simulado, não é prova de evento acontecendo na data da revisão.
- TypeScript e build aprovados; aviso do tamanho do chunk WebGL continua registrado. Auditoria npm após Radix: zero vulnerabilidades reportadas naquele momento.

Mudanças locais, sem novo commit/push nesta revisão. Esta iteração ainda não recebeu novo teste do responsável em aparelho físico; o relato anterior permanece válido para o percurso daquela versão, sem atribuí-lo automaticamente às novas telas.

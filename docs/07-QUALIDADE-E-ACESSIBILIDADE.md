# 07 — Performance, descoberta e acessibilidade

Referência: 16/11/2026. Critérios propostos para implementação. Não há aplicação nem medições de performance nesta fase.

## Performance

Carregar o mapa somente ao entrar nessa experiência; manter a entrada e o conteúdo textual leves. Redimensionar e comprimir imagens, definir dimensões e carregar imagens secundárias sob demanda. Evitar baixar todas as fotos de todos os espaços na abertura.

Medir separadamente entrada, primeiro mapa e abertura de detalhe em build de produção. Registrar dispositivo/emulação, conexão, cache e versão. Fazer três execuções por cenário e observar a mediana, sem transformar laboratório em alegação de desempenho real durante o festival.

Metas de referência propostas: LCP até 2,5 s e CLS até 0,1 nos cenários de laboratório definidos; observar resposta a filtros e abertura de detalhes, sem apresentar INP de campo sem coleta real. Se a meta não for atingida, registrar resultado e impacto em vez de declarar aprovação automática. Orçamento inicial de JavaScript e imagens será definido após a direção visual e a primeira medição.

## Acessibilidade e legibilidade

- HTML semântico, idioma pt-BR, títulos coerentes e nomes acessíveis nos controles.
- Teclado para navegação e ações essenciais, foco visível e retorno ao controle de origem após fechar painéis.
- Contraste alvo: 4,5:1 em texto comum, 3:1 em texto grande e informação gráfica essencial. Medir valores da paleta escolhida.
- Cor não será a única identificação de categoria, seleção ou estado.
- Alvos de toque propostos com pelo menos 44 × 44 CSS px nas ações principais; evitar controles adjacentes sem separação.
- Inputs com pelo menos 16 px em dispositivos de toque; não bloquear zoom. Revisar a 200% de zoom e em viewport estreita.
- Alternativa em lista para lugares e atividades. Não exigir arrastar o mapa para acessar informações.
- Painéis e diálogos sem conteúdo coberto por navegação fixa, teclado virtual ou áreas seguras do celular.
- Feedback de salvamento e erros compreensível com tecnologia assistiva, sem anúncios repetitivos.
- Texto alternativo para imagens informativas; imagens decorativas não repetem os rótulos do conteúdo.
- Respeitar preferência por movimento reduzido; não depender de animação para entender ações.

Esses critérios são metas de engenharia e revisão. Não declarar conformidade integral com uma norma apenas por executar ferramenta automática.

## Rede e falhas

Conteúdo editorial versionado deve permitir consultar listas e detalhes sem depender do sucesso dos tiles. Isso não significa funcionamento offline após fechar o navegador ou no primeiro acesso sem rede. Não prometer mapas offline no MVP.

Tratar falha de geolocalização, imagens e armazenamento de forma localizada, sem bloquear a aplicação inteira. Preservar o texto da memória em caso de falha no salvamento. Informar data de revisão da agenda e link para origem oficial.

## Descoberta e identificação

Título, descrição e compartilhamento identificam VivaSE Cultura, São Cristóvão e FASC 2026. Não usar logotipos institucionais como prova de parceria sem confirmação. O site se apresenta como protótipo independente para o ideathon.

Enquanto a versão pública e o domínio não forem definidos, não cadastrar sitemap, analytics, indexação ou campanhas. Política de indexação e metadados de domínio ficam para a publicação. Conteúdo local escrito pelo visitante não entra em metadados públicos.

## Privacidade prática

Sem login, rastreamento ou recebimento de lembranças pelo servidor nesta entrega. A API de mapas externa recebe as requisições necessárias ao serviço; informar as integrações de forma compreensível no Sobre. Não declarar que nenhum dado sai do aparelho, pois mapa base e links externos envolvem rede.

As memórias pessoais são locais, podem ser apagadas pelo navegador e não têm backup garantido. Não coletar posição contínua ou associar localização real aos textos. Exportação, nuvem e publicação compartilhada exigem definição futura.

Plano de verificação: [08](08-ESTRATEGIA-DE-TESTES.md). Integrações e termos: [06](06-MAPA-LOCALIZACAO-E-ROTEIROS.md).

## Atualização após implementação

O texto acima preserva os critérios de planejamento. A aplicação já existe: evidências efetivamente executadas na orientação, resultados automáticos, relato em celular físico e limites estão no [relatório da fase 3](15-FASE-3-VALIDACAO.md). Cenários culturais e medições finais permanecem pendentes; não considerar todos os P0 do MVP concluídos.

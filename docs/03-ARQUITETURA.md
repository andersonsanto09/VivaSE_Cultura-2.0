# 03 — Arquitetura proposta

Referência de planejamento: 16/11/2026. Na Fase 1 a pasta `src` ainda não existia. A primeira estrutura efetiva foi criada na Fase 2, com estado e diferenças registrados em [11](11-FASE-2-FUNDACAO.md). O plano abaixo permanece referência, compatível com a decisão de adiar administração e publicação compartilhada.

## Base existente

O manifesto declara React 18, React DOM 18, Leaflet 1.9, React Leaflet 4, TypeScript e Vite 5 com plugin React. Os scripts existentes são `dev`, `build` e `preview`. O script atual de build chama apenas Vite e não substitui uma verificação de tipos. Versões efetivamente resolvidas devem ser conferidas no lockfile na fundação técnica.

Não migrar de framework para reconstruir as telas. Avaliar as vulnerabilidades relatadas na instalação e o script pendente do esbuild antes da primeira execução; não aplicar atualização com quebra de versão sem verificar compatibilidade. Não há backend, autenticação ou banco configurados no repositório recebido.

## Organização sugerida

```text
index.html
vite.config.ts
tsconfig.json
src/
  main.tsx
  App.tsx
  components/        # controles e elementos compartilhados
  features/
    home/
    map/
    schedule/
    places/
    routes/
    memories/
    timeline/
  data/              # edição, espaços, agenda e acervo revisado
  domain/            # tipos, filtros e regras de data
  services/          # localização, armazenamento e destino externo
  styles/            # tokens e composição, após direção visual
public/              # mídias autorizadas e arquivos públicos
docs/                # planejamento e registros editoriais
```

Esta árvore não obriga um arquivo por item nem justifica abstrações sem uso. Agrupar por função facilita manter o mapa separado do conteúdo histórico.

## Fluxo de dados

Fontes oficiais e acervo -> revisão editorial -> dados versionados -> componentes de interface. A atualização é manual pela equipe e exige nova versão do site. Não há sincronização automática ou administração escondida no cliente.

Geolocalização -> estado de sessão em memória -> indicador de posição. Memória escrita pelo visitante -> validação local -> armazenamento do navegador -> lista de memórias pessoais. Memórias locais não modificam os dados editoriais, não entram na linha do tempo pública e não são enviadas ao GitHub.

Filtros, seleção e dia consultado ficam em estado da aplicação. URLs por hash ou History API podem representar telas; escolher o mecanismo mais simples que suporte voltar/avançar e links internos testáveis, sem adicionar biblioteca apenas por hábito.

## Contratos de conteúdo propostos

| Entidade | Campos principais | Integridade |
| --- | --- | --- |
| Edição | id, ano, nome, tema, início, fim, fuso, revisão | 2026 como edição ativa; `America/Sao_Paulo` para horários |
| Espaço | id, nome, categoria, endereço/referência, localização, fontes, revisão | Latitude/longitude podem estar pendentes; não inventar coordenada |
| Atividade | id, título, espaço, dia de programação, início, término opcional, status, fontes | Espaço existente; desconhecido não é meia-noite |
| Marco histórico | id, data ou período, título, texto, fontes | Precisão preservada; ano não implica data exata |
| Memória editorial | id, texto, lugar opcional, período, origem, crédito, fonte opcional | Origem: fictícia ou referência publicada; não fingir usuário real |
| Memória pessoal | id local, texto, apelido opcional, lugar opcional, período opcional, criação | Origem pessoal/local; texto exibido sem HTML executável |
| Roteiro | id, nome, descrição, paradas ordenadas, observações | Paradas existentes; distância e duração só com base declarada |
| Fonte | id, título, autor/instituição, URL, consulta, localizador, tipo | Cada referência existe e é acessível ao leitor |

Dados geográficos de área e de percurso itinerante não devem ser reduzidos a um ponto de entrada supostamente exato. O documento 06 define a apresentação desses casos.

## Persistência e integrações

Armazenamento local com chave versionada e validação ao ler, por exemplo `vivase:memorias:v1`; tratar quota, bloqueio e JSON inválido. Uma falha não pode produzir aviso de sucesso. Limpeza do navegador pode apagar os dados; o usuário precisa saber disso antes de salvar.

Mapa base fornecido externamente com atribuição; provedor ainda a selecionar. Rotas em aplicativo externo com destino validado; modelo de URL e fornecedor a selecionar na implementação. Links são construídos por função única, sem interpolação de texto não validado.

## Evolução prevista

API de conteúdo, administração, publicação moderada de memórias e atualização compartilhada podem substituir adaptadores locais em outra fase. Não implementar banco ou login antecipadamente. Nenhuma escolha de serviço de nuvem está feita.

Decisões e status: [10](10-DECISOES-TECNICAS.md). Riscos: [09](09-ROADMAP.md).

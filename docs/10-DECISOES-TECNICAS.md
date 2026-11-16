# 10 — Decisões e justificativas

Referência: 16/11/2026. “Confirmada” é uma decisão do responsável; “proposta técnica” é uma recomendação para a implementação; “pendente” não será tratada como resolvida. Nenhum registro significa que uma função já foi implementada.

| ID | Decisão | Estado | Motivo e consequência |
| --- | --- | --- | --- |
| D-01 | VivaSE 2.0 orienta turistas durante o FASC 2026 | Confirmada | Prioriza orientação, depois descoberta cultural e memória |
| D-02 | Cobrir todos os espaços com atividades do evento | Confirmada | Pesquisa determina inventário; não limitar aos palcos principais ou afirmar completude antes de reconciliar |
| D-03 | Incluir memórias e linha do tempo no MVP | Confirmada | Compõem o diferencial cultural; comparação estatística de edições fica para depois |
| D-04 | Abrir trajeto em mapa externo | Confirmada | Evita construir navegação interna no prazo; VivaSE mantém localização e roteiros |
| D-05 | Memórias escritas ficam no próprio aparelho | Confirmada | Sem conta, servidor ou publicação compartilhada; avisar perda por limpeza do navegador |
| D-06 | Exemplos de memórias podem ser fictícios | Confirmada | Rótulo visível em cada exemplo; não atribuir falas inventadas a pessoas reais |
| D-07 | Buscar relatos publicados na internet | Confirmada | Registrar fonte e contexto; não apresentar referência jornalística como contribuição enviada ao VivaSE |
| D-08 | Administração fica para outra fase | Confirmada | Conteúdo revisado pela equipe e versionado; não prometer atualização remota em tempo real |
| D-09 | Discutir design após documentação | Confirmada | Valores de paleta, fontes e telas continuam abertos |
| D-10 | Preservar React, TypeScript, Vite e Leaflet | Proposta técnica | Compatível com dependências existentes; validar instalação e segurança na fundação |
| D-11 | Conteúdo editorial em arquivos versionados | Proposta técnica | Atende protótipo sem backend e preserva rastreabilidade; mudanças exigem nova publicação |
| D-12 | Armazenamento local versionado e validado | Proposta técnica | Reduz falhas de leitura e separa exemplos editoriais das memórias pessoais |
| D-13 | Localização sob demanda, sem persistir coordenadas | Proposta técnica | Mantém orientação opcional e reduz complexidade de observação contínua |
| D-14 | Alternativa em lista para mapa e tiles | Proposta técnica | Conteúdo permanece utilizável com falha de cartografia ou sem GPS |
| D-15 | Provedor de tiles e fornecedor de rotas | Pendente | Selecionar por termos, atribuição e comportamento no ambiente disponível |
| D-16 | Novo repositório VivaSE_Cultura-2.0 | Confirmada pelo endereço informado | Preservar origem antiga e arquivos locais; conferir estado remoto antes de qualquer sincronização |

## D-04 — Navegação externa

Alternativa considerada: calcular e renderizar trajeto caminhável dentro do mapa. Exigiria integração adicional, tratamento de restrições e revisão de uso do provedor. O responsável aceitou trajeto externo após recomendação para o prazo do ideathon. Não impede evolução futura.

## D-05 e D-06 — Memórias

Separar três origens: exemplo fictício, referência publicada e lembrança pessoal local. Não usar número de exemplos como estatística de usuários. Não chamar “publicar” uma ação que apenas salva no aparelho. Não transformar conteúdo de rede social ou matéria em testemunho cedido à plataforma.

## D-02 — Cobertura

O compromisso é levantar e representar todos os espaços do evento. Se uma fonte não localizar um espaço ou horário, registrar o item e a pendência, não excluí-lo para manter uma aparência de completude. Serviços temporários e locais itinerantes requerem descrição apropriada.

## D-10 — Base técnica recebida

A pasta `src` não consta do histórico clonado; o código da aplicação precisa ser reconstruído. O repositório antigo fornece README, manifesto e lockfile. A nova implementação não deve ser apresentada como recuperação exata do código perdido.

## Registro de mudanças

16/11: concluído alinhamento de edição, cobertura, funções, rotas e origem das memórias. A recomendação inicial de 2024 e administração local foi substituída pelas respostas do responsável. Manter histórico das decisões relevantes sem preservar instruções obsoletas como se ainda fossem pendências.

Detalhes de arquitetura: [03](03-ARQUITETURA.md). Perguntas e riscos: [09](09-ROADMAP.md). Fontes: [FONTES-E-CURADORIA](FONTES-E-CURADORIA.md).

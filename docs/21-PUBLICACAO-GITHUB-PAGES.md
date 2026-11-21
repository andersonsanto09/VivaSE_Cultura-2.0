# 21 — Publicação no GitHub Pages

Publicação solicitada em 17/11/2026, após os ajustes visuais aprovados. O responsável autorizou tornar o repositório público porque o plano atual não oferece Pages para este repositório privado.

## Destino

- Repositório: `bernas0610/VivaSE_Cultura-2.0`.
- Site: https://bernas0610.github.io/VivaSE_Cultura-2.0/
- O projeto usa um subdiretório próprio. O repositório e o site do portfólio não são substituídos.
- Fonte de publicação: workflow `.github/workflows/pages.yml` em pushes para `main`, também executável manualmente.

## Configuração

Vite utiliza base relativa (`./`), com logo resolvida por `import.meta.env.BASE_URL`. Imagens de fundo, chunks e worker seguem os caminhos do build. A navegação por hash permite abrir mapa/programação sem regras especiais de servidor.

O workflow instala pelo lockfile, executa os testes de domínio, gera `dist` e publica o artefato oficial de Pages. Os arquivos locais `.env.local`, `tmp`, `node_modules` e `dist` não entram no commit.

`VITE_MAPTILER_KEY` é uma variável do repositório usada no build. Trata-se da chave de navegador do mapa, que faz parte do cliente público. Nenhuma credencial de autenticação do GitHub foi gravada no projeto.

O domínio `bernas0610.github.io` (sem protocolo ou caminho) precisa estar em **Allowed HTTP Origins** da chave MapTiler, além das origens locais existentes. Essa configuração libera as requisições do mapa no domínio; não modifica páginas ou conteúdo do portfólio. No teste inicial, a origem pública retornou 403; o responsável confirmou ter salvo o domínio em 17/11/2026.

## Verificação da publicação

Conferir o resultado do workflow, o carregamento em `/VivaSE_Cultura-2.0/`, a foto, a logo, os chunks e o worker do mapa. A confirmação de que o mapa público carrega depende também da origem permitida no MapTiler.

Build e dez testes de domínio aprovados. Teste local do build no subdiretório `/VivaSE_Cultura-2.0/` confirmou foto, logo, chunks/worker, 20 marcadores e a agenda, sem respostas HTTP locais de erro. A verificação pública será feita após a conclusão do workflow.

## Publicação confirmada

- Commit de implementação: `60a024b`, enviado para `main`.
- Workflow de publicação: [execução 44141859082](https://github.com/bernas0610/VivaSE_Cultura-2.0/actions/runs/44141859082), concluída com sucesso.
- Site público respondeu HTTP 200 em 17/11/2026.
- Foto e logo carregaram a partir do subdiretório do projeto.
- MapTiler respondeu HTTP 200 para a origem pública após salvar `bernas0610.github.io` nas origens permitidas.
- Conferidos 20 pins, busca por Péricles, detalhes e 51 atividades no sábado, 21/11.
- Agenda em 390 px sem rolagem horizontal; nenhum erro JavaScript ou resposta HTTP de falha na verificação.
- Evidências locais: `tmp/pages-public/result.json` e capturas na mesma pasta.

O site do portfólio não foi modificado. A revisão em aparelho físico continua sendo uma validação distinta da automação em navegador.

## Novo repositório — 21/11/2026

O envio das atualizações de 20 e 21/11 (plataforma cultural e linha do tempo 2005–2026) para `bernas0610/VivaSE_Cultura-2.0` foi recusado com HTTP 403: a conta `andersonsanto09`, usada pelo Git neste computador, não tem permissão de escrita nesse repositório. A pedido do responsável, o projeto passou a ter um repositório no perfil dele.

- Repositório: [andersonsanto09/VivaSE_Cultura-2.0](https://github.com/andersonsanto09/VivaSE_Cultura-2.0), público (o GitHub Pages gratuito exige repositório público, como no original).
- Site: https://andersonsanto09.github.io/VivaSE_Cultura-2.0/
- Histórico completo enviado, incluindo todos os commits do repositório original.
- GitHub Pages ativado com fonte **GitHub Actions**; o mesmo workflow `.github/workflows/pages.yml` publica a cada push em `main`.
- Remotos locais: `origin` aponta para o novo repositório; o original ficou como `bernas0610`.
- O repositório e o site de `bernas0610` não foram alterados e continuam com a versão de 19/11.

### Pendências do responsável

1. **Variável do mapa.** Cadastrar `VITE_MAPTILER_KEY` em *Settings → Secrets and variables → Actions → Variables* do novo repositório, com a mesma chave pública do `.env.local`, e rodar o workflow de novo (*Actions → Publish VivaSE to GitHub Pages → Run workflow*). Sem ela, o build termina, mas o mapa vetorial não carrega; lista, agenda e demais páginas continuam funcionando.
2. **Origem no MapTiler.** Acrescentar `andersonsanto09.github.io` em **Allowed HTTP Origins** da chave, como foi feito para `bernas0610.github.io` em 17/11.

O resultado do workflow e a verificação do site estão no [registro 37](37-LINHA-DO-TEMPO-2005-2026.md).

# 15 — Encerramento da fase 3: orientação e navegação

Revisão: 16/11/2026. Base anterior: commit `10d36c0`; este documento descreve as alterações posteriores da fase 3. Estado: concluída no escopo de orientação do protótipo, com limites de verificação registrados. Próxima fase: 4, roteiros, memórias e linha do tempo.

## Correções realizadas

- Busca, categoria e filtros da programação passam a fazer parte da URL. Alterar texto/filtro atualiza a entrada atual do histórico; abrir um espaço cria uma navegação, permitindo voltar/avançar sem perder a consulta. Recarregar ou abrir o mesmo link preserva os filtros.
- Ao abrir um espaço pela programação, o detalhe oferece “Voltar à programação”. O retorno recupera dia, espaço e busca da consulta original, mesmo se o visitante trocar o dia dentro do detalhe.
- O foco vai para o título da tela após troca de página, para o título do espaço ao abrir um detalhe e para o resultado de origem ao voltar à lista. A posição de rolagem da lista é recuperada após seleção.
- Identificador de espaço desconhecido mostra orientação e mantém os 20 resultados utilizáveis; não tenta montar um seletor CSS a partir do identificador recebido.
- Falhas de localização preservam exploração: recusa, timeout, posição indisponível, API ausente e exceção síncrona. Resposta atrasada é ignorada após sair da tela; não força retorno ao mapa. Se o dia mudar durante a solicitação, o retorno usa o dia atual.
- Grupos de dia/visualização receberam semântica adequada; fundo da legenda do mapa ficou opaco para legibilidade previsível.
- Consulta sem resultado na agenda usa mensagem aplicável a qualquer filtro, sem mencionar um espaço não relacionado.

## Evidências executadas

| Área | Resultado e método |
| --- | --- |
| T-01, T-03, T-04, T-05 | Entrada, lista/mapa, busca sem acentos, categoria, estado vazio, seleção, retorno e histórico verificados em Edge/Chromium |
| T-02, T-07 | Sete testes de domínio aprovados: integridade, cobertura da v4, marcadores, datas e madrugadas; lista mestra do documento 12 preservada |
| T-06 | Agenda filtrada → detalhe → outro dia → retorno à consulta original; URL, dia, filtro e resultados conferidos |
| T-08 | Sucesso de GPS simulado: precisão recebida, indicador e ausência de persistência em localStorage/sessionStorage; recarregar não restaura a posição |
| T-09 | Recusa, timeout, indisponibilidade, API ausente, exceção síncrona e resposta tardia simuladas sem bloquear a consulta |
| T-10 | URL externa revisada sem abrir rota real; cópia simulada com sucesso e bloqueio, sem anunciar sucesso indevido |
| T-17 | Sobre/créditos e identificação de protótipo disponíveis; fontes e data mantidas |
| T-18 | Percurso por Tab/Enter, link de pulo, foco ao abrir/voltar; reflow em 360, 390, 640, 768 e 1440 px sem overflow horizontal nas cinco telas verificadas |
| T-19 | Falha do mapa preserva lista; falha da arte da entrada preserva texto e acesso ao mapa |
| Gestos | Roda, arraste com botão do meio/direito, inclinar/vista de cima e controle móvel aprovados |
| Produção | Typecheck e build aprovados. O aviso de chunk grande do motor WebGL permanece documentado; não foi ocultado |
| Segurança de dependências | Auditoria npm na instalação de axe-core: zero vulnerabilidades reportadas naquele momento |

Scripts: `npm test`, `npm run build`, `python -X utf8 tests/browser.py`, `python -X utf8 tests/map-gestures.py` e `python -X utf8 tests/phase-3.py`. Suítes de navegador exigem servidor local, Python Playwright e Edge. O mapa vetorial real é renderizado, com estilo/cartografia simulados nos testes para não consumir a cota externa a cada execução.

## Acessibilidade: alcance da avaliação

Axe-core como dependência de desenvolvimento; sem código de auditoria no bundle do produto. Executados critérios automatizados com tags WCAG 2 A/AA e 2.1 AA em entrada, lista, detalhe, agenda e sobre. Nenhuma violação detectada nesses percursos; não equivale a certificação ou conformidade integral.

O relatório pede revisão manual de contraste em quatro números auxiliares sobrepostos a outros marcadores na tela de detalhe. Cores do número/fundo são `#47214b`/`#ffffff`, razão calculada 13,23:1. O impedimento automático é a sobreposição, não contraste insuficiente da combinação. Marcadores próximos ainda podem cobrir parte de números auxiliares; nome completo, ícone, lista equivalente e zoom permanecem alternativas. Esse refinamento visual continua na revisão final, sem afirmar que todos os marcadores ficam totalmente separados em qualquer zoom.

Reflow de 200% foi simulado pela largura de 640 CSS px, equivalente a 1280 px a 200%; não foi alegado uso de zoom nativo em navegador nem de leitor de tela. A captura foi inspecionada. Zoom nativo, leitor de tela e outros engines continuam no escopo da qualidade final.

## Teste em celular físico

O responsável aceitou testar em aparelho físico e informou, nesta conversa: “Tudo funcionou, sem cortes ou travamentos”, para entrada → mapa/lista → busca por Péricles → espaço → troca de dia → retorno → programação e rolagem. Registro de teste do usuário, distinto da automação. Modelo do aparelho e navegador não informados; não se generaliza para todos os celulares.

Prévia temporária disponibilizada na rede local (`192.168.1.6:5173`) a pedido do responsável. Esse acesso não é publicação de produção. O mapa precisa dessa origem permitida na chave MapTiler; GPS real em celular por HTTP pode ser indisponível. Portanto, GPS real por HTTPS e rotas em campo não foram declarados validados.

## O que não encerra junto com esta fase

- T-11 a T-16: roteiros, memórias, armazenamento e linha do tempo são da fase 4; ainda não implementados.
- T-20 e revisão final: métricas em produção/conexão limitada, zoom nativo, leitor de tela, cobertura de engines, ajustes visuais finais e ensaio do pitch pertencem à fase 5.
- Acessos temporários, acessibilidade física, bloqueios e serviços do festival dependem de dados específicos; não deduzidos do mapa.
- Não houve novo commit/push nesta fase até este registro; o snapshot anterior permanece no GitHub. Alterações atuais são locais.

O checklist do projeto e o roadmap foram atualizados para a fase 4 como próximo trabalho, sem iniciar automaticamente as funções culturais.

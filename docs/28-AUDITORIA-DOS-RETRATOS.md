# 28 — Auditoria dos retratos do acervo

Revisão de 18/11/2026 após o responsável identificar uma fotografia de Edcity no card de Gaby Amarantos. A associação anterior foi um erro de seleção na galeria; estar na mesma reportagem que o artista não comprova a identidade do retrato.

## Correções

- **Gaby Amarantos:** substituída pela imagem publicada após a legenda nominal de Gaby na cobertura de 2025, arquivo original terminado em `11.12.27 (6).jpeg`.
- **Edcity:** o arquivo anterior foi comparado à imagem sob a legenda nominal de Edcity (`11.12.27 (8).jpeg`), com diferença média de pixels igual a zero na comparação normalizada. Foi associado ao registro de Edcity, sem criar uma nova participação ou alterar sua curadoria.
- **Marina Lima:** substituída a imagem escolhida no bloco anterior da reportagem pela fotografia que vem após o texto e a declaração da cantora, arquivo `13.23.44 (1).jpeg`.
- **BaianaSystem:** substituída a fotografia do bloco de Marina pela imagem do show, após o parágrafo e a declaração sobre BaianaSystem, arquivo `13.23.47.jpeg`. A legenda descreve o conjunto no palco, sem atribuir todos os rostos a um integrante específico.
- Os seis outros retratos existentes (Alceu, The Baggios, Filipe Catto, Lamparina, Karol Conká e Olodum) foram cotejados com as imagens originais e seus blocos/legendas publicados. Identificação por contexto editorial e arquivo, sem reconhecimento facial.

Os três retratos substituídos usam nomes de arquivo novos para não reaproveitar o endereço dos arquivos errados no cache. Arquivos antigos sem uso foram removidos. Cada retrato agora registra URL da imagem original e evidência editorial específica, além de crédito e reportagem.

## Fontes

- [Cobertura oficial da primeira noite de 2025](https://www.saocristovao.se.gov.br/noticia/primeira-noite-de-shows-do-fasc-2025-e-marcada-por-sucesso-de-publico-e-representatividade-negra-nos-palcos).
- [Cobertura oficial do segundo dia de 2024](https://www.saocristovao.se.gov.br/noticia/fasc-2024-diversidade-musical-e-grande-publico-marcam-o-segundo-dia-de-apresentacoes-nos-palcos-joao-bebe-agua-e-frei-santa-cecilia).
- [Cobertura oficial de Alceu e The Baggios em 2022](https://www.saocristovao.se.gov.br/noticia/alceu-valenca-the-baggios-e-coletivo-sergipano-de-mulheres-no-samba-animam-publico-do-palco-gal-costa-no-segundo-dia-do-fasc).

## Cobertura e ausências

A auditoria abrange os **191 artistas/grupos** e todos os arquivos de retrato cadastrados. Há **10 registros com foto**; entre os **80 destaques**, **72 não têm fotografia cadastrada**. O inventário lista separadamente as 181 ausências no catálogo completo. Ausência neste projeto não significa inexistência de imagem em outras fontes; esta revisão não promete uma pesquisa fotográfica completa para cada um desses nomes.

Inventário verificável, com fontes específicas e hashes dos arquivos: [auditoria JSON](fontes/auditoria-fotos-artistas-2026-11-18.json).

A alternativa tipográfica informa “Fotografia ainda não disponível.” Quando uma foto existente falha, o texto informa a falha. O estado de erro está associado ao arquivo, para que não contamine o próximo retrato ao mudar de artista.

## Verificação

35 testes de domínio, incluindo vínculos, proveniência, integridade dos arquivos e cobertura do inventário. `tests/artist-photo-browser.py` verifica os dez retratos carregados, nomes/legendas/fontes, ausência explícita, recuperação após falha, reflow móvel e axe. Conferência dos arquivos e do contexto editorial é humana; os testes não reconhecem pessoas em imagens.

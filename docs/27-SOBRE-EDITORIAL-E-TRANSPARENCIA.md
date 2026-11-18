# 27 — Sobre: propósito, equipe e transparência

Implementado em 18/11/2026, conforme as oito melhorias aprovadas. A autoria é apresentada como **Equipe VivaSE**, sem nomes ou funções individuais, por escolha do responsável.

## Conteúdo e composição

- Abertura editorial com fotografia inédita no site: vista aérea noturna da Praça São Francisco. Fonte: reportagem municipal de 01/08/2025 sobre os 15 anos da chancela; foto de Heitor Xavier. Nova imagem exclusiva da aba Sobre, com crédito e contexto preservados. Tipografia Barlow Condensed e DM Sans e paleta oficial de referência do FASC mantidas.
- Propósito, história do problema e três pilares com ações para mapa, roteiros e memórias.
- Apresentação coletiva da equipe e origem do protótipo para apresentação em ideathon. Independência em relação à organização do FASC explícita.
- Fontes e créditos, precisão do mapa/roteiros, fotografias e dados no aparelho organizados em acordeões acessíveis.
- Cobertura calculada a partir do catálogo, sem confundir registros, artistas e endereços físicos. Créditos consultáveis dos 20 espaços.
- Seis perguntas frequentes: oficialidade, localização, lembranças, conexão, filtros temporais e precisão dos pins.
- Sugestões de correção por formulário de issue do repositório, confirmado com issues habilitadas. O link não envia nada automaticamente; a página explica conta necessária e publicação da sugestão.
- Encerramento com ações para mapa e Cultura. Dia selecionado preservado; índice interno por hash mantém foco e suporta movimento reduzido.

## Privacidade e limites

Texto atualizado para favoritos, progresso manual dos roteiros e lembranças; informa edição/exclusão/exportação, risco de remoção ao limpar o navegador, ausência de sincronização/importação e dependência de internet. Localização permanece opcional e na sessão. Não há promessa de canal oficial, mapa offline, acesso exato, trajetos verificados ou informação em tempo real.

## Verificação

`tests/about-browser.py`: foto e crédito, equipe, navegação/retorno de dia, atalhos internos e foco, catálogo dinâmico, créditos, privacidade, FAQ por teclado, formulário de correção, falha de imagem, reflow em 1440/768/390/320 px e axe com acordeões expandidos em desktop/celular. Capturas conferidas em `tmp/about/` (não versionadas).

32 testes existentes e build de produção aprovados. A avaliação estética final pelo responsável e a nova conferência em aparelho físico continuam pendentes.

## Fonte da nova fotografia

[Reportagem municipal — Praça São Francisco, 15 anos de chancela](https://www.saocristovao.se.gov.br/noticia/praca-sao-francisco-completa-15-anos-como-patrimonio-da-humanidade). Imagem original: `https://publicacao.saocristovao.se.gov.br/laravel-filemanager/photos/3/Heitor_Xavier_02.JPG`. Arquivo otimizado em 1600 × 900; a fotografia foi conferida visualmente, e o novo arquivo não duplica os arquivos existentes. Atribuição não equivale a licença irrestrita; a revisão editorial de direitos permanece pendente no checklist.

A inspeção de direção visual preserva as escolhas aprovadas do FASC (roxo, títulos condensados, pequenos rótulos e divisores). Sem vídeo ou animação de entrada automática: a interação fica nos acordeões, links e cards, respeitando movimento reduzido.

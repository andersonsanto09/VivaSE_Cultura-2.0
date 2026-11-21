# 34 — Fase 5: qualidade e apresentação

Iniciada em 19/11/2026. Fases 1–4 concluídas no escopo do protótipo. A fase 5 está **em andamento**: revisão técnica e apoio inicial preparados; ensaio humano, condições finais da banca e pendências de curadoria continuam abertos.

## Condições confirmadas

O responsável confirmou pitch de **três minutos**, com **computador, projetor e internet**. Não informou o dia/horário específico nem os critérios da banca. Não há necessidade de aguardar essas informações para preparar o percurso.

Entregáveis: [roteiro cronometrado](35-ROTEIRO-PITCH-3-MINUTOS.md) e [apoio local com seis capturas reais](apresentacao/index.html). Abrir o HTML com toda a pasta `apresentacao` presente. O apoio tem navegação por botões/setas, preserva créditos das telas e funciona sem rede; não é uma versão offline do aplicativo. Impressão pelo navegador mostra as seis telas.

## Programação conferida

Em 19/11, a [notícia oficial de horários](https://www.saocristovao.se.gov.br/noticia/fasc-2026-confira-os-horarios-dos-shows-nos-palcos-joao-bebe-agua-e-frei-santa-cecilia), publicada em 12/11, ainda aponta para a [programação completa v4](https://anexos.saocristovao.se.gov.br/storage/files/62/FASC%202026_Programa%C3%A7%C3%A3o%20Completa%20v4.pdf). O download foi comparado byte a byte ao PDF arquivado no projeto: **idênticos**.

SHA-256 de ambos: `9d5b16fc1f7141e14fd7eff565717f3b6583635bc1ac9d6a7733f824f42e5311`.

Os horários detalhados dos dois palcos principais na notícia correspondem ao cadastro. Esta revisão confirma a fonte atualmente vinculada pela Prefeitura; não garante ausência de comunicados em outros canais ou mudanças posteriores. A data original de conferência editorial nas telas foi preservada. Os 144 registros de agenda representam atividades/sessões/intervalos, não 144 atrações distintas.

## Verificações executadas

- `npm test`: **42 testes aprovados**; `npm run build`: TypeScript e build aprovados. O primeiro build foi impedido pelo sandbox (`EPERM` em `realpath`); repetido com execução autorizada, passou. O aviso de tamanho do chunk MapLibre permanece; o mapa é carregado separadamente.
- `tests/planning-browser.py`: favoritos, conflitos/seleção, compartilhamento sem contexto privado, roteiro/progresso, edição/exportação de memória, quota e aviso temporário do mapa aprovados. Seis telas em 1440/390/320px e auditoria axe móvel sem violações reportadas.
- `tests/phase-4.py`: roteiros, retorno ao mapa, fotos/fallback, memórias locais, texto literal, nenhuma transmissão do relato, armazenamento bloqueado/corrompido/quota, marcos históricos e reflow 1440/768/390/320px aprovados.
- `tests/history-dates-scroll.py`: datas exemplificadas, rolagem do painel contida no desktop, rolagem natural móvel e ausência de espaço vazio/overflow em 768/390/320px aprovadas; axe sem violações reportadas.
- `tests/phase-3.py`: orientação por teclado, foco, filtros, histórico, retorno à agenda, cópia de endereço, falhas de GPS, resposta tardia, posição sem persistência, imagem indisponível e reflow até largura equivalente a 200% aprovados. Cinco telas sem violações axe reportadas. A inspeção automática não resolveu o contraste sobre a foto do hero; a regra do crédito usa texto branco sobre fundo escuro a 80% de opacidade, mantendo contraste mesmo sobre branco. Isso não equivale a uma certificação de acessibilidade ou teste completo com leitor de tela.
- Os seletores antigos da suíte da fase 3 foram atualizados: CTA do hero separado do link de rodapé e ação “Ver espaço” separada do novo diálogo de atividade. Nenhuma falha de produto foi identificada nesses dois casos.
- `tests/phase-5.py`: build de produção em preview, seis capturas com mapa real, nenhuma exceção de página, falha controlada do MapTiler com aviso/lista acessíveis e agenda de sábado com 51 registros disponível apesar da falha do provedor.
- `tests/pitch-support.py`: seis capturas carregadas com rede desligada, navegação por setas, limites de avanço e impressão aprovados; nenhuma requisição HTTP. Pasta de apoio com aproximadamente 814 KB.
- Teste físico cultural confirmado pelo responsável em 19/11: **sem problemas**. Aparelho/navegador não informados. Não substitui vistoria das rotas, acessibilidade dos locais ou GPS em campo.

## Amostra de carregamento

Edge 157.0.4341.60 headless, Windows, viewport 390×844, produção local, cache desabilitado, configuração CDP de 150ms de latência/200.000 bytes por segundo/CPU 4×, três contextos novos. LCP observado até cinco segundos após `load`: **1.380 / 1.208 / 1.212ms**, mediana **1.212ms**. Recursos reportados pelo navegador: **555.309 bytes** por amostra na Home. A evidência estruturada está em [fontes/qualidade-fase-5-2026-11-19.json](fontes/qualidade-fase-5-2026-11-19.json).

São amostras de laboratório local, sem equivalência à rede real do evento, CDN do Pages, hardware físico, navegação posterior ou mapa. A Home móvel pode solicitar imagens diferentes da desktop. Não usar estes resultados para prometer tempo de carregamento ou aprovação de Core Web Vitals em produção. O mapa ainda depende de rede, GPU/WebGL e provedor externo.

## Limites e pendências

1. Ensaiar os três minutos com a equipe e o projetor disponível; verificar legibilidade a distância. O roteiro possui tempos planejados, não um ensaio humano já realizado.
2. Confirmar dia/horário, critérios da banca e se perguntas entram nos três minutos.
3. Reutilização das mídias: manter a pendência do inventário da fase 4. Das 150 associações revisadas, 48 declaram licença; as demais têm origem/crédito, sem autorização específica registrada. Publicação institucional não foi tratada como domínio público. Esta rodada não concluiu uma análise de licença dessas mídias.
4. Acervo parcial: 42 participações antigas sem dia individual, 61 artistas sem retrato; todos os 80 destaques têm foto. Não preencher lacunas com datas ou imagens presumidas.
5. Memórias e favoritos são locais; não há servidor, moderação nem sincronização. Mapas não funcionam integralmente offline. Referências aproximadas e trajetos não vistoriados continuam explicitados.
6. Reconfirmar comunicados da organização no dia do pitch. Evitar novas funcionalidades antes da apresentação; priorizar falhas reproduzíveis.

## Ajustes posteriores — 20 e 21/11/2026

- **Plataforma cultural** ([36](36-PLATAFORMA-CULTURAL.md)): a raiz `#/` abre a Home do VivaSE sobre São Cristóvão; a Home do FASC passou para `#/fasc`. As rotas do FASC usadas no roteiro do pitch (`#/mapa`, `#/programacao`, `#/roteiros`, `#/memorias`, `#/historia`) não mudaram. Para abrir o pitch pela Home do FASC, usar `#/fasc` em vez da raiz.
- **Linha do tempo** ([37](37-LINHA-DO-TEMPO-2005-2026.md)): a tela `#/historia` mostra só 2005 a 2026 (14 marcos). O mapa histórico continua com as 18 edições.
- `npm test` passou a ter **52 testes** (10 novos da plataforma), todos aprovados; typecheck aprovado.
- Os testes Playwright `phase-3`, `phase-4`, `phase-5`, `art-polish` e `visual-review` foram atualizados para a nova raiz e para o novo recorte da linha do tempo. Não foram executados de novo após os ajustes, porque o ambiente atual não tem o pacote `playwright`.

Critério para encerrar a fase: ensaio repetível dentro do tempo, condições finais registradas, pendências de mídia resolvidas ou decisão documentada sobre seu uso/substituição e versão de apresentação identificada. Os itens abertos não impedem preparar e testar o percurso do MVP.

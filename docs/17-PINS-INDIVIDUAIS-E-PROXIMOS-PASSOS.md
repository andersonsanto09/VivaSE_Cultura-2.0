# 17 — Pins individuais e próximos passos

16/11/2026. Decisão mais recente do responsável: sem cluster na abertura, pins individuais e afastamento local apenas para colisões. Substitui a experiência agrupada descrita no documento 16. Mantém o restante da revisão visual, filtros, componentes Radix e validação da fase 3.

## Mapa entregue

- Vinte marcadores individuais permanecem renderizados; não há agrupador que substitua os pins ou esconda os demais durante uma seleção. Pins fora da área geográfica da vista podem naturalmente estar fora da tela.
- Abertura enquadra os 19 registros do Centro Histórico, com limite de aproximação 16,5 e padding para controles/pins. A largura disponível pode exigir afastar um pouco em celular. A Bica é o ponto distante e entra ao acionar “Ver todos os espaços”, ou ao selecioná-la na lista.
- Ícone reduzido de 22 para 18 px; pin de 44 para 34 px, sombra discreta e número só no selecionado. Escala diminui ao afastar.
- Referências até 15 m recebem distribuição radial pequena apenas quando seus ícones colidem na tela. Uma segunda passagem corrige outras colisões reais de tela, com deslocamento limitado a 72 px multiplicado pela escala. Sem afastar arbitrariamente lugares pelo município.
- Coordenadas originais preservadas. Traço e ponto no extremo mostram a referência real de qualquer marcador deslocado. Contorno tracejado e mensagem no detalhe continuam informando posição aproximada.
- Se ainda houver colisão, clicar no pin abre a lista de vizinhos (“N espaços aqui”), sem mudar o zoom. A lista permite escolher o espaço. Escape/fechar devolve o foco ao marcador; não se usa aproximação automática para resolver esse clique.
- Não foi configurada fonte de clustering GeoJSON para os pins: eles são marcadores HTML individuais. A fonte GeoJSON restante desenha apenas a precisão da posição do usuário.

## Validação desta revisão

- Oito testes de domínio aprovados, incluindo distribuição de seis pontos coincidentes sem modificar âncoras, deslocamento limitado, caso sem colisão e detecção de vizinhos residuais.
- `tests/visual-review.py`: 20 pins, nenhum cluster; 19 referências centrais inteiramente no enquadramento inicial; “Ver todos” inclui 20 com Bica; fallback abre sem mudar escala/zoom e oferece escolha; filtros/cards/agenda “agora” e cores dos dias permanecem corretos.
- Verificações de navegador em 1440, 768, 390 e 360 px, sem overflow horizontal; navegação, GPS/cópia com falhas, teclado/foco, URLs, gestos e reflow aprovados.
- Axe-core nas cinco telas verificadas sem violações detectadas ou itens inconclusivos naquela execução. Isso não substitui leitor de tela ou certificação de acessibilidade.
- TypeScript/build verificados. Cartografia real e capturas das três larguras revistas separadamente; testes funcionais usam estilo simulado para evitar consumo repetido da cota.
- Aviso do chunk grande de MapLibre permanece para a medição/otimização da fase 5. A versão atual ainda precisa de nova avaliação em aparelho físico após as revisões de interface; o relato anterior se refere ao percurso anterior.

## Snapshot e checklist

O responsável solicitou commit/push da revisão acumulada desde `10d36c0`: encerramento da fase 3, refinamentos visuais, filtros/agenda e decisão final de pins individuais. O identificador e a sincronização são conferidos no Git e informados na entrega. `.env.local`, artefatos temporários e build não entram no commit; somente exemplo sem chave real é versionado.

## Próximos passos

1. Fase 4: criar roteiros culturais com paradas e fontes; integrar cada parada ao mapa e ao trajeto externo.
2. Fase 4: explorar memórias identificadas por origem e permitir escrever/remover lembranças no próprio navegador, com persistência e falhas de armazenamento testadas.
3. Fase 4: construir linha do tempo com marcos documentados, sem inventar edições, públicos, depoimentos ou artistas.
4. Fase 5: reconferir programação, medir performance real/conexão limitada, validar GPS por HTTPS e qualidade ampliada, preparar material/ensaio do pitch e combinar hospedagem.

Administração, login, memórias compartilhadas e comparação estatística continuam fora do MVP desta apresentação.

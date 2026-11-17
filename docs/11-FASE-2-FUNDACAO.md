# 11 — Fase 2: fundação e conteúdo

Revisão: 16/11/2026. Fundação técnica e curadoria da v4 concluídas. O responsável avaliou o protótipo e as correções solicitadas foram aplicadas. A fase atual é a validação dos fluxos da fase 3; a conclusão da fundação não equivale à conclusão do MVP. Este relatório preserva o histórico da primeira implementação; a evolução MapLibre está no documento 14.

## Entregue

- React 18, TypeScript estrito e Vite, com desenvolvimento, testes, typecheck e build.
- Entrada com identidade FASC 2026 fornecida pelo responsável; mapa/lista, programação e sobre com navegação por URL.
- Inventário de 20 espaços/frentes, sem contar equipamentos compartilhados como endereços independentes.
- Agenda dos três dias: 144 registros reconciliados com as 21 páginas de conteúdo da v4; busca por artista, atividade ou participante e filtro por espaço/dia.
- Madrugadas com data civil seguinte; intervalos finais apenas quando publicados; sessões com detalhes expansíveis.
- Referências geográficas para os 20 registros. Precisão de equipamento, praça, rua ou saída de cortejo declarada; fontes acessíveis no detalhe. Não são 20 entradas exatas.
- Bica posicionada pelo estabelecimento no link fornecido; Casa Tsuru nº 84 e Reurb ao lado da Caixa incorporadas com confirmação do responsável.
- Um marcador por espaço, com seleção direta e numeração estável. Marcadores próximos são separados visualmente, ligados por linha pontilhada à referência original; coordenadas de origem preservadas.
- Busca sem exigir acentos, categorias, estados vazios recuperáveis e preservação de contexto ao voltar.
- Endereço copiável, abertura externa no Google Maps e aviso de acessos/bloqueios locais.
- Localização solicitada por ação, tratamento de recusa/falha e retorno ao festival.
- Lista utilizável quando os tiles falham; mapa carregado sob demanda; layouts desktop e celular.
- Créditos, fonte/data e limites explícitos; PDF preservado apenas na documentação, fora dos arquivos públicos do build e sem links nas telas.

A [lista mestra](12-INVENTARIO-E-PROGRAMACAO.md) contém reconciliação, fontes e pendências de precisão/transcrição.

## Dependências

React 18 e Leaflet preservados. Vite atualizado de 5 para 6.4.6 e plugin React 4.7.0. Transitivas corrigidas com `npm audit fix`, sem `--force`; auditoria após correção não reportou vulnerabilidades naquele momento. Isso não substitui uma auditoria futura.

O esbuild funciona no build. O ambiente ainda informa script pós-instalação não aprovado na política npm; não foi concedida autorização global para scripts.

## Verificações finais

- Sete testes de domínio aprovados: madrugadas, intervalos, busca, itens sem posição, marcadores individuais, cobertura da v4 e integridade de catálogo.
- TypeScript e build de produção aprovados.
- Edge/Chromium: entrada, seleção direta de marcadores, busca por atração, detalhe, troca de dia, endereço Tsuru, destino externo e recuperação de busca vazia.
- Agenda: 49 registros na sexta, filtro por cinema, janela Tsuru atravessando meia-noite e consulta em 390 px.
- Localização negada e falha de tiles preservam lista; localização permitida fora da área e retorno ao festival verificados.
- Capturas em 1440, 768 e 390 px; nenhum overflow horizontal nos cenários verificados e nenhuma exceção de página no percurso automatizado.
- Inspeção automatizada do mapa: zero falhas e zero avisos; capturas das três larguras e agenda mobile revistas visualmente. Não equivale a aceite visual do responsável.

Tiles simulados na suíte de navegador; links externos inspecionados sem executar a navegação. A inspeção visual usa o carregamento normal do mapa, com atribuição visível. Evidências locais ignoradas pelo Git: `tmp/phase-2-qa/` e `tmp/phase-2-inspect/`.

## Executar

```sh
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

Servidor local em `http://127.0.0.1:5173/`. Com servidor ativo e Python Playwright/Edge disponíveis: `python -X utf8 tests/browser.py`. No sandbox desta sessão, build e navegador exigiram execução fora da restrição.

## O que permanece pendente

- Refinamento visual durante a validação dos fluxos; a avaliação atual não encerra o MVP completo.
- Avaliar o `.txt` de sugestões de outra IA quando for enviado; ele ainda não foi recebido.
- Validação completa das jornadas da fase 3, teclado, zoom e celular físico.
- Roteiros culturais, memórias locais e linha do tempo da fase 4.
- Curadoria histórica por afirmação, seleção de mídias com direitos e reconferência de atualizações antes do pitch.
- Planta de serviços, acessibilidade e acessos temporários: informação específica ainda não confirmada.
- Ensaio, material de apoio e publicação a combinar na fase 5; sem prometer operação offline.

O responsável solicitou commit e push do snapshot; não houve publicação em hospedagem. Próximas entregas e critérios: [checklist de todas as fases](13-CHECKLIST-DO-PROJETO.md).

## Ajustes após avaliação do responsável — 16/11/2026

- Removida a lista agrupada do mapa; 20 marcadores individuais abrem diretamente seus espaços. Separação visual não altera as coordenadas de origem.
- Removidos links do PDF das telas. Fonte preservada em `docs/fontes/`, sem PDF no build público.
- Sete testes, typecheck, build e suíte de navegador aprovados após os ajustes; capturas desktop/mobile revistas.

export interface CulturalSource {title:string;url?:string;note?:string}
export const culturalSources={
  unesco:{title:'UNESCO — Praça São Francisco',url:'https://whc.unesco.org/en/list/1272/'},
  historico:{title:'Governo de Sergipe — Museu Histórico',url:'https://sergipe.se.gov.br/agencia/funcap/unidades/unidades_ocultas/museu_historico_de_sergipe_sao_cristovao_'},
  sacra:{title:'Governo de Sergipe — Museu de Arte Sacra',url:'https://sergipe.se.gov.br/agencia/funcap/unidades/unidades_ocultas/museu_de_arte_sacra_de_sao_cristovao'},
  culturas:{title:'Turismo de São Cristóvão — Casa das Culturas Populares',url:'https://turismo.saocristovao.se.gov.br/casa-culturas-populares/'},
  vesta:{title:'Prefeitura — equipamentos culturais',url:'https://www.saocristovao.se.gov.br/noticia/prefeitura-amplia-funcionamento-de-equipamentos-culturais-de-sao-cristovao'},
  programa:{title:'Programação FASC 2026 — v4',note:'Material fornecido pelo responsável; revisão de 16/11/2026. Confira a programação do dia no VivaSE.'},
  origem:{title:'UFS — abertura e história do FASC',url:'https://www.ufs.br/conteudo/60741-abertura-do-festival-de-artes-de-sao-cristovao-acontece-nesta-sexta'},
  retomada:{title:'UFS — A volta do FASC',url:'https://www.ufs.br/conteudo/60725-a-volta-do-fasc'},
  cinquenta:{title:'UFS — documentário Ato de Resistência',url:'https://www.ufs.br/conteudo/70837-ufs-prestigia-lancamento-de-documentario-ato-de-resistencia-50-anos-do-fasc'},
  edicao2024:{title:'Prefeitura — abertura do FASC 2024',url:'https://www.saocristovao.se.gov.br/noticia/abertura-oficial-do-fasc-2024-e-marcada-por-homenagens-e-discurso-sobre-liberdade-e-democracia'},
  relatos:{title:'Prefeitura — primeira noite do FASC 2025',url:'https://www.saocristovao.se.gov.br/noticia/primeira-noite-de-shows-do-fasc-2025-e-marcada-por-sucesso-de-publico-e-representatividade-negra-nos-palcos'},
} satisfies Record<string,CulturalSource>;

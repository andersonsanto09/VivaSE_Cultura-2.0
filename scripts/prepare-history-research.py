"""Prepare reproducible import input from the owner's six research files.

Keeps provenance and source-check results; fetching a document does not itself
verify each assertion. No coordinates are obtained by geocoding artist names.
"""
import json,re,unicodedata,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
INPUT=Path('D:/downloads')
def normalize(value):
    return re.sub(r'[^a-z0-9]+',' ',unicodedata.normalize('NFD',value or '').encode('ascii','ignore').decode().lower()).strip()
def canon(url):return url.replace('/index.php/','/').replace('http://','https://').rstrip('/')
data=json.loads((INPUT/'VivaSE_FASC_Acervo_Consolidado_1972_2025.json').read_text(encoding='utf-8-sig'))
audit=json.loads((ROOT/'tmp/curation-2/source-audit.json').read_text(encoding='utf8'))
checks={canon(row['url']):row for row in audit}
sources=[]
urls=list(dict.fromkeys([u for e in data['edicoes'] for v in e['espacos'] for u in v['source_urls']]+[u for p in data['participacoes'] for u in p['fonte_urls']]))
for url in urls:
    row=checks.get(canon(url),{})
    sources.append({'url':url,'documentRetrieved':row.get('status') in ['ok','cached'],'review':'documento consultado' if row.get('textFile') else 'fonte indicada na pesquisa; consulta automatizada indisponível'})
for p in data['participacoes']:
    rows=[checks.get(canon(u),{}) for u in p['fonte_urls']]
    texts=[Path(r['textFile']).read_text(encoding='utf8') for r in rows if r.get('textFile')]
    name=normalize(p['artista'])
    aliases={'zeze motta':['zeze mota'],'the baggios':['baggios'],'liniker e os caramelows':['liniker'],'joesia ramos':['joesia'],'chiko queiroga e antonio rogerio':['chiko queiroga'],'orquestra sinfonica de sergipe':['orquestra sinfonica'],'carmen lucia':['carmen lucia'],'sergio vaz':['sergio vaz']}
    found=any(any(n in normalize(t) for n in [name,*aliases.get(name,[])]) for t in texts)
    p['validation']={'documentRetrieved':bool(texts),'nameLocated':found,'scope':'nome localizado no documento; ano, palco e status dependem da leitura contextual' if found else 'registro da pesquisa recebida; conferência individual pendente'}
    # Raw negative records remain separate. Never turn a cancellation into a show.
for row in data['edicoes']:
    for v in row['espacos']:
        located=[]
        geo=[]
        for url in v['source_urls']:
            r=checks.get(canon(url),{})
            if not r.get('textFile'):continue
            t=normalize(Path(r['textFile']).read_text(encoding='utf8'))
            name=normalize(v['name']);location=normalize(v.get('location_text'))
            if name in t:
                located.append(url)
                pos=t.find(name)
                # Evidence is a named venue near its textual location, not a
                # generic city name found elsewhere in the same document.
                location_tokens=[x for x in location.split() if len(x)>3 and x not in ['igreja','senhora','homens','centro','historico','concentracao']]
                window=t[max(0,pos-40):pos+len(name)+260]
                if location_tokens and all(token in window for token in location_tokens):geo.append(url)
        v['validation']={'nameLocatedIn':located,'locationLocatedNearName':geo}
data['sourceAudit']=sources
dest=ROOT/'docs/fontes/pesquisa-recebida';dest.mkdir(parents=True,exist_ok=True)
for name in ['dossie_fasc_para_codex.md','fasc_edicoes_espacos_1972_2025.json','pesquisa_artistas_fasc_para_codex.md','fasc_artistas_e_participacoes_pesquisadas.json','VivaSE_FASC_Acervo_Consolidado_1972_2025.json','VivaSE_PROMPT_Codex_e_Dossie_Historico.md']:
    (dest/name).write_bytes((INPUT/name).read_bytes())
(ROOT/'src/data/research-import.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(ROOT/'tmp/curation-2/validation-summary.json').write_text(json.dumps({'input':len(data['participacoes']),'namesLocated':sum(p['validation']['nameLocated'] for p in data['participacoes']),'sourcesRetrieved':sum(s['documentRetrieved'] for s in sources),'sources':len(sources)},ensure_ascii=False,indent=2),encoding='utf8')
print((ROOT/'tmp/curation-2/validation-summary.json').read_text(encoding='utf8'))

(ROOT/'src/data/edition-index.json').write_text(json.dumps([{'id':str(e['ano']),'year':e['ano']} for e in data['edicoes']],ensure_ascii=False,indent=2)+'\n',encoding='utf8')

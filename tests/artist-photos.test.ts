import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {artistPhotos} from '../src/data/artist-photos.ts';
import {historicalArtists} from '../src/data/history.ts';
const audit=JSON.parse(readFileSync('docs/fontes/expansao-fotos-artistas-2026-11-18.json','utf8'));
const previous=JSON.parse(readFileSync('docs/fontes/auditoria-fotos-artistas-2026-11-18.json','utf8'));
test('retratos têm vínculo com artista, imagem original e evidência editorial; arquivos correspondem à revisão',()=>{
 const hashes=new Map<string,string[]>();
 for(const [id,p] of Object.entries(artistPhotos)){
  assert.ok(historicalArtists.some(a=>a.id===id),id);assert.match(p.source,/^https:\/\//);assert.match(p.imageSource,/^https:\/\//);assert.ok(p.evidence.length>30,id);assert.ok(p.credit.trim(),id);
  const file=`public/images/artists/${p.file}`;assert.ok(existsSync(file),id);const hash=createHash('sha256').update(readFileSync(file)).digest('hex');hashes.set(hash,[...(hashes.get(hash)||[]),id]);assert.equal(hash,audit.portraits.find((a:any)=>a.artistId===id)?.sha256,id);
  if(p.context==='other')assert.match(p.evidence,/outro|extern|não.*FASC/i,id);
  if(p.license){assert.ok(new URL(p.licenseUrl||p.source));assert.match(p.source,/commons\.wikimedia\.org/);}
 }
 for(const ids of hashes.values())if(ids.length>1)for(const id of ids){assert.deepEqual(new Set(artistPhotos[id].sharedWith),new Set(ids.filter(other=>other!==id)),`Foto conjunta precisa identificar os dois artistas: ${id}`);}
 for(const old of previous.portraits)assert.equal(audit.portraits.find((p:any)=>p.artistId===old.artistId).sha256,old.sha256,'Preservar as dez associações corrigidas anteriormente');
});

test('todos os destaques têm fotografia e imagens externas não recebem legenda de apresentação no FASC',()=>{
 for(const artist of historicalArtists.filter(a=>a.featured))assert.ok(artistPhotos[artist.id],artist.name);
 for(const [id,p] of Object.entries(artistPhotos))if(p.context==='other'||p.context==='publicity')assert.doesNotMatch(p.caption,/· FASC \d{4}/,id);
 assert.equal(audit.counts.withPhoto,Object.keys(artistPhotos).length);
});
test('correções mantêm arquivos distintos e as imagens exatas revisadas, sem reutilizar o endereço antigo em cache',()=>{
 assert.ok(artistPhotos.gaby.imageSource.endsWith('(6).jpeg'));assert.ok(artistPhotos.edcity.imageSource.endsWith('(8).jpeg'));
 assert.ok(artistPhotos.marina.imageSource.includes('13.23.44'));assert.ok(artistPhotos.baiana.imageSource.includes('13.23.47'));
 for(const [id,old] of [['gaby','gaby.jpg'],['marina','marina.jpg'],['baiana','baiana.jpg']])assert.notEqual(artistPhotos[id].file,old);
});
test('inventário de ausências cobre o catálogo completo sem remover artistas ou prometer fotos inexistentes',()=>{
 const missing=historicalArtists.filter(a=>!artistPhotos[a.id]);assert.equal(audit.counts.artists,historicalArtists.length);assert.equal(audit.counts.allWithoutPhoto,missing.length);assert.equal(audit.counts.featuredWithoutPhoto,missing.filter(a=>a.featured).length);assert.deepEqual(new Set(audit.missing.map((a:any)=>a.id)),new Set(missing.map(a=>a.id)));
});

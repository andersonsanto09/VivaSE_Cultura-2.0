import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {artistPhotos} from '../src/data/artist-photos.ts';
import {historicalArtists} from '../src/data/history.ts';
const audit=JSON.parse(readFileSync('docs/fontes/auditoria-fotos-artistas-2026-11-18.json','utf8'));
test('retratos têm vínculo com artista, imagem original e evidência editorial; arquivos correspondem à revisão',()=>{
 const hashes=[];
 for(const [id,p] of Object.entries(artistPhotos)){
  assert.ok(historicalArtists.some(a=>a.id===id),id);assert.match(p.source,/^https:\/\/www\.saocristovao\.se\.gov\.br\/noticia\//);assert.match(p.imageSource,/^https:\/\/publicacao\.saocristovao\.se\.gov\.br\//);assert.ok(p.evidence.length>30,id);
  const file=`public/images/artists/${p.file}`;assert.ok(existsSync(file),id);const hash=createHash('sha256').update(readFileSync(file)).digest('hex');hashes.push(hash);assert.equal(hash,audit.portraits.find((a:any)=>a.artistId===id)?.sha256,id);
 }
 assert.equal(new Set(hashes).size,hashes.length,'Nenhum arquivo de retrato duplicado entre artistas nesta revisão');
});
test('correções mantêm arquivos distintos e as imagens exatas revisadas, sem reutilizar o endereço antigo em cache',()=>{
 assert.ok(artistPhotos.gaby.imageSource.endsWith('(6).jpeg'));assert.ok(artistPhotos.edcity.imageSource.endsWith('(8).jpeg'));
 assert.ok(artistPhotos.marina.imageSource.includes('13.23.44'));assert.ok(artistPhotos.baiana.imageSource.includes('13.23.47'));
 for(const [id,old] of [['gaby','gaby.jpg'],['marina','marina.jpg'],['baiana','baiana.jpg']])assert.notEqual(artistPhotos[id].file,old);
});
test('inventário de ausências cobre o catálogo completo sem remover artistas ou prometer fotos inexistentes',()=>{
 const missing=historicalArtists.filter(a=>!artistPhotos[a.id]);assert.equal(audit.counts.artists,historicalArtists.length);assert.equal(audit.counts.allWithoutPhoto,missing.length);assert.equal(audit.counts.featuredWithoutPhoto,missing.filter(a=>a.featured).length);assert.deepEqual(new Set(audit.missing.map((a:any)=>a.id)),new Set(missing.map(a=>a.id)));
});

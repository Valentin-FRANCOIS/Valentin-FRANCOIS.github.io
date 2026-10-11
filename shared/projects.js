const range=document.querySelector('#reveal');range?.addEventListener('input',()=>document.querySelector('#compare').style.setProperty('--split',range.value+'%'));
function selected(button,attribute){document.querySelectorAll('['+attribute+']').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}
let videoSwitchId = 0;
let videoResumePending = false;
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  const video = document.querySelector('#lo-video');
  const resume = videoResumePending || !video.paused;
  const switchId = ++videoSwitchId;
  videoResumePending = resume;
  selected(button, 'data-video');
  video.poster = 'assets/' + button.dataset.poster;
  video.src = 'assets/' + button.dataset.video;
  video.load();
  if (resume) {
    // Call during the click to preserve user activation on mobile browsers.
    video.play().then(() => {
      if (switchId === videoSwitchId) videoResumePending = false;
    }).catch(() => {
      // A newer selection can cancel this play request; native controls remain usable.
      if (switchId === videoSwitchId) videoResumePending = false;
    });
  }
}));
const meshLabels={rectangle:'Rectangle',trou:'Contour avec trou',u:'Forme concave',quad:'Plaque à trou circulaire — quadrilatères avec raffinement géométrique',quadSimple:'Rectangle — quadrilatères réguliers',geometrique:'Plaque à trou circulaire — triangles avec raffinement géométrique'};
const meshAssets={quad:'mailleur-quads-geometriques.svg',quadSimple:'mailleur-quads-simples.svg',geometrique:'mailleur-trou-circulaire-geometrique.svg'};
const meshCaptions={quad:'Trou circulaire approché — 768 quads · maillage structuré à couches graduées, plus fines près du trou · critères géométriques contrôlés',quadSimple:'Mailleur — 24 quads carrés issus de graines régulières, puis recombinaison et subdivision · 24 cellules conformes aux critères géométriques retenus',geometrique:'Même plaque — raffinement selon la géométrie · triangles plus petits près du trou, plus grands à distance · contour et géométrie contrôlés'};
function translated(text){return window.portfolioTranslate?window.portfolioTranslate(text):text}
function updateMesh(key){const name=meshLabels[key];const im=document.querySelector('#mesh-image');const src='assets/'+(meshAssets[key]||'mailleur-'+key+'.svg');if(im.getAttribute('src')!==src)im.src=src;im.alt=(document.documentElement.lang==='en'?'Saved result: ':'Résultat enregistré : ')+translated(name);document.querySelector('#mesh-caption').textContent=translated(meshCaptions[key]||name+' — résultat enregistré')}
document.querySelectorAll('[data-mesh]').forEach(b=>b.addEventListener('click',()=>{selected(b,'data-mesh');updateMesh(b.dataset.mesh)}));
document.querySelectorAll('[data-boat]').forEach(b=>b.addEventListener('click',()=>{selected(b,'data-boat');const im=document.querySelector('#boat-image');im.src='assets/'+b.dataset.boat;im.alt=(document.documentElement.lang==='en'?'Boat — ':'Bateau — ')+b.textContent}));

// Soyut Cebir I: anında güncelleme ve internetsiz çalışma (network-first, sürümlü önbellek).
// Sürüm: Gw4NtwHlCPfu
const C="sc1-onbellek-Gw4NtwHlCPfu",F=["./","icerik.bin","manifest.webmanifest","ikon-192.png","ikon-512.png","ikon-maske-512.png","ikon-180.png"];
const KOK=new URL("./",self.location).href;
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("sc1-")&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);if(!u.href.startsWith(KOK))return;
  let ad=u.origin+u.pathname;if(r.mode==="navigate"||ad===KOK+"index.html")ad=KOK;
  e.respondWith(
    fetch(new Request(ad,{cache:"no-cache"})).then(res=>{
      if(res.ok)return caches.open(C).then(c=>c.put(ad,res.clone())).then(()=>res);
      return res;
    }).catch(()=>caches.open(C).then(c=>c.match(ad)).then(hit=>hit||caches.match(ad)))
  );
});

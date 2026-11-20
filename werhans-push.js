self.addEventListener('push', event => {
  const text=event.data?.text()||'Jemand aus deiner Familie ist gerade einkaufen.';
  let data;try{data=JSON.parse(text);}catch{}
  const calendar=data?.type==='calendar';
  const body=calendar?data.body:text;
  const tag=calendar?data.tag:'werhans-einkauf';
  event.waitUntil(self.registration.showNotification(calendar?'Termin-Erinnerung':'The 4 Werhans',{
    body,tag,icon:'./werhans-icon.png.PNG',badge:'./werhans-icon.png.PNG'
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url=self.registration.scope;
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const existing=windows.find(client=>client.url.startsWith(url));
    if(existing)await existing.focus();else await self.clients.openWindow(url);
  })());
});

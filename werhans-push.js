self.addEventListener('push', event => {
  const body = event.data?.text() || 'Jemand aus deiner Familie ist gerade einkaufen.';
  event.waitUntil(self.registration.showNotification('The 4 Werhans', {
    body,
    tag: 'werhans-einkauf'
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = self.registration.scope;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });
    const existing = windows.find(client => client.url.startsWith(url));
    if (existing) await existing.focus();
    else await self.clients.openWindow(url);
  })());
});

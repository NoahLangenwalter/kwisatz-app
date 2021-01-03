addEventListener('install', event => {
    event.waitUntil(caches.open('core').then(cache => {
        cache.add(new Request('offline.html'));
        cache.add(new Request('entry.html'));
        cache.add(new Request('addEntry.svg'));
        cache.add(new Request('back.svg'));
        cache.add(new Request('menu.svg'));
        cache.add(new Request('options.svg'));
        cache.add(new Request('search.svg'));
    }));
});

addEventListener('fetch', event => {
    var request = event.request;

    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request).then(response => {
                return response;
            }).catch(error => {
                return caches.match(request).then(response => {
                    return response || caches.match('offline.html');
                });
            })
        );
    }
});
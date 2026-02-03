self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/go/")) {
    const target = decodeURIComponent(url.pathname.slice(4));
    event.respondWith(
      fetch("/bare/" + target, {
        headers: event.request.headers
      })
    );
  }
});

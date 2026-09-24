// Route chunks Home links to. App.jsx lazy-loads them with these same loaders, so a
// prefetch here makes the later tap instant.
export const loadNoticias = () => import('../pages/Noticias/Noticias');
export const loadContactos = () => import('../pages/Contactos/Contactos');
export const loadCancioneiro = () => import('../pages/Cancioneiro/Cancioneiro');

let done = false;

// Runs once, in idle time. Home calls it when the hero photo has loaded, so on slow
// connections the prefetch never competes with the first paint.
export function prefetchLikelyRoutes() {
  if (done) return;
  done = true;
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));
  idle(() => {
    loadContactos();
    loadNoticias();
    loadCancioneiro();
  });
}

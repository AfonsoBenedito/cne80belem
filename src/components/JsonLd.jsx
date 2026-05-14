import { useEffect } from 'react';

/**
 * Injects a <script type="application/ld+json"> tag into <head>.
 * Cleans up on unmount so structured data doesn't leak between pages.
 */
export default function JsonLd({ data }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, [data]);

  return null;
}

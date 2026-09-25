import { useLayoutEffect, useRef } from 'react';

// When `trigger` changes (a filtered list, a category), the children of `ref` that stay slide
// from their old place to the new one (FLIP) and the ones that arrive fade in, so a list
// visibly narrows or rearranges instead of jumping. Children are matched by `data-flip-key`.
// A change mid-slide starts from where each child is on screen; children far off screen
// aren't animated. Reduced motion keeps the fade and drops the slide.
export function useFlipList(ref, trigger) {
  const positions = useRef(new Map());

  useLayoutEffect(() => {
    const children = ref.current ? [...ref.current.children] : [];
    const prev = positions.current;
    const next = new Map();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    for (const el of children) {
      const key = el.dataset.flipKey;
      const parent = el.offsetParent;
      const box = parent?.getBoundingClientRect();
      // Layout position (ignores any transform in flight), in page coordinates
      const x = (box ? box.left + window.scrollX : 0) + el.offsetLeft;
      const y = (box ? box.top + window.scrollY : 0) + el.offsetTop;
      next.set(key, { x, y });
      if (prev.size === 0) continue;

      const viewY = y - window.scrollY;
      if (viewY > window.innerHeight + 200 || viewY < -400) continue;

      const before = prev.get(key);
      const running = el.getAnimations().filter((a) => a.id === 'flip');
      let dx = 0;
      let dy = 0;
      if (running.length) {
        const now = el.getBoundingClientRect();
        dx = now.left - (x - window.scrollX);
        dy = now.top - viewY;
      } else if (before) {
        dx = before.x - x;
        dy = before.y - y;
      }
      running.forEach((a) => a.cancel());

      if (!before) {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-out', id: 'fade' });
      } else if ((dx || dy) && !reduced) {
        el.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
          { duration: 280, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', id: 'flip' },
        );
      }
    }
    positions.current = next;
  }, [ref, trigger]);
}

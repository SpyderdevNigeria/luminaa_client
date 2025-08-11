import { useEffect } from "react";

export function useGoogleTranslateCleanup() {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const el = node as HTMLElement;

            if (
              el.className.includes("goog-text-highlight") ||
              el.className.includes("goog-te")
            ) {
              const parent = el.parentNode;
              if (parent) {
                // Move children out safely
                while (el.firstChild) {
                  parent.insertBefore(el.firstChild, el);
                }
                // Defer the removal so React is done with its updates
                requestAnimationFrame(() => {
                  if (parent.contains(el)) {
                    parent.removeChild(el);
                  }
                });
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
}

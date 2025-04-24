import { useEffect, useRef, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
  root?: null | Element;
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function useIntersectionObserver<T extends Element>({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = false,
}: UseIntersectionObserverProps = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        
        // If it should only trigger once and is in view, disconnect the observer
        if (triggerOnce && entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return { ref, inView };
}

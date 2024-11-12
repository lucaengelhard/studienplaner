import { RefObject, useEffect, useRef, useState } from "react";

export default function useResize<T extends HTMLElement>(): [
  RefObject<T>,
  { width: number; height: number }
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateSize = () => {
      console.log(element);

      setSize({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    };

    // Initialize size on mount
    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(element);

    // Cleanup observer on component unmount
    return () => resizeObserver.disconnect();
  }, []);

  return [ref, size];
}

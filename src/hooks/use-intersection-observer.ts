import { useEffect, useRef } from 'react';

import useIntersectionObserver, {
  type IntersectionObserverOptions,
  type MockIntersectionObserverEntry,
} from '@react-hook/intersection-observer';

const useIntersectionObserverOnce = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T> | T | null,
  options?: IntersectionObserverOptions & { once?: boolean },
): MockIntersectionObserverEntry | IntersectionObserverEntry => {
  const { once = false, ...restOptions } = options || {};

  const wasCalledRef = useRef(false);

  const { isIntersecting, ...rest } = useIntersectionObserver(ref, restOptions);

  useEffect(() => {
    if (!wasCalledRef.current && isIntersecting) {
      wasCalledRef.current = true;
    }
  }, [isIntersecting]);

  if (!once) {
    return { isIntersecting, ...rest };
  }

  if (wasCalledRef.current) {
    return { isIntersecting: true, ...rest };
  }

  return { isIntersecting, ...rest };
};

export default useIntersectionObserverOnce;

import { useCallback, useEffect, useRef, useState } from 'react';

import { useThrottleCallback } from '@react-hook/throttle';

const useGlossaryActiveHash = (updater: string[]) => {
  const [activeHash, setActiveHash] = useState('');
  const postsRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    postsRefs.current = Array.from(document.querySelectorAll('.glossary-post'));
  }, [updater]);

  const handleChangeActiveHash = useCallback(() => {
    const currentIdx = postsRefs.current.findIndex(
      (post) => post.getBoundingClientRect().top - 20 >= 0,
    );

    const idx = currentIdx === -1 ? postsRefs.current.length - 1 : Math.max(currentIdx - 1, 0);

    if (idx === 0 && postsRefs.current[idx].getBoundingClientRect().top > 50) {
      setActiveHash('');
      return;
    }

    const { id } = postsRefs.current[idx];
    setActiveHash(id);
  }, []);

  const onScroll = useThrottleCallback(handleChangeActiveHash, 10);

  useEffect(() => {
    handleChangeActiveHash();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return [activeHash];
};

export default useGlossaryActiveHash;

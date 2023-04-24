import { useCallback, useEffect, useState } from 'react';

import copyToClipboard from 'copy-to-clipboard';

export default function useCopyToClipboard(resetInterval: number | null) {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((text: string) => {
    if (typeof text === 'string' || typeof text === 'number') {
      copyToClipboard(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
    }
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => clearTimeout(timeout);
  }, [isCopied, resetInterval]);

  return { isCopied, handleCopy };
}

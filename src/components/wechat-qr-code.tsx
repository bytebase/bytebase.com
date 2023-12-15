'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { useCurrentLocale } from '@/locales/client';
import Icon from './icon';

const WechatQRCode = () => {
  const currentLocale = useCurrentLocale();
  const [shouldShow, setShouldShow] = useLocalStorage('bb-helper-wechat-qrcode', false);

  useEffect(() => {
    const language = window.navigator.language;
    // If the user's language is `zh` or current locale is `zh`, show the wechat QR code.
    setShouldShow(language === 'zh-CN' || language === 'zh' || currentLocale === 'zh');
  }, []);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed right-0 bottom-24 z-[9999] h-auto w-52 bg-white p-2 shadow sm:w-32">
      <div
        className="absolute -top-2 -left-2 cursor-pointer rounded-full bg-white p-0.5 shadow"
        onClick={() => setShouldShow(false)}
      >
        <Icon.X className="h-auto w-5 opacity-60 hover:opacity-100" />
      </div>
      <p className="flex justify-center">微信扫码咨询</p>
      <Image
        className="h-auto max-w-full"
        src="/images/bb-helper-wechat-qrcode.webp"
        width={260}
        height={260}
        alt="Bytebase wechat QR code"
      />
    </div>
  );
};

export default WechatQRCode;

'use client';

import Script from 'next/script';

export function FrontChat() {
  return (
    <Script
      id="front-chat-script"
      src="https://chat-assets.frontapp.com/v1/chat.bundle.js"
      onLoad={initFrontChat}
    />
  );
}

function initFrontChat() {
  //@ts-expect-error front
  window.FrontChat('init', {
    chatId: '6ab681c213f52905994155f216327b1f',
    useDefaultLauncher: true,
  });
}

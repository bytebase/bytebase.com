'use client';

export function Arcade({ src }: { src: string }) {
  return (
    <div className="relative flex h-0 w-full pb-[calc(75%+41px)]">
      <iframe src={src} loading="lazy" className="absolute inset-0 h-full w-full" allowFullScreen />
    </div>
  );
}

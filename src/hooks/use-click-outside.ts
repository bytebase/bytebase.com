import { useEffect } from 'react';

type RefObject<T> = {
  readonly current: T | null;
};

type ClickOutsideHandler = (event?: MouseEvent | TouchEvent) => void;

const events = [`mousedown`, `touchstart`] as const;

export default function useClickOutside<T extends HTMLElement>(
  refs: RefObject<T>[],
  onClickOutside: ClickOutsideHandler,
) {
  const isOutside = (element: EventTarget | null) =>
    refs.every((ref) => !ref.current || !ref.current.contains(element as Node));

  const onClick = (event: MouseEvent | TouchEvent) => {
    if (isOutside(event.target)) {
      onClickOutside(event);
    }
  };

  useEffect(() => {
    events.forEach((event) => document.addEventListener(event, onClick));

    return () => {
      events.forEach((event) => document.removeEventListener(event, onClick));
    };
  });
}

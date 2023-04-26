import { getCookie, isCookieEnabled, setCookie } from 'tiny-cookie';

type CookieOptions = {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};

export const tinyCookie = (): {
  set(key: string, value: string, options?: CookieOptions): void;
  get(key: string): string;
  setURLParams(options?: CookieOptions): void;
} => {
  const enabled = isCookieEnabled();

  return {
    set(key: string, value: string, options?: CookieOptions) {
      if (!enabled) {
        return;
      }

      setCookie(key, value, options);
    },
    get(key: string): string {
      if (!enabled) {
        return '';
      }
      return getCookie(key) || '';
    },
    setURLParams(options?: CookieOptions) {
      const params = new URLSearchParams(window.location.search);

      params.forEach((value, key) => {
        this.set(key, value, options);
      });
    },
  };
};

import { useState } from "react";

const getCookieValue = (key: string): string => {
  return document.cookie
    .split("; ")
    .reduce((total: string, currentCookie: string): string => {
      const item = currentCookie.split("=");
      const storedKey = item[0];
      const storedValue = item[1];

      return key === storedKey ? decodeURIComponent(storedValue) : total;
    }, "");
};

const useCookies = (key: string, defaultValue: string): string => {
  const getCookie = () => getCookieValue(key) || defaultValue;
  const [cookie, setCookie] = useState<string>(getCookie());
  return cookie;
};

export default useCookies;

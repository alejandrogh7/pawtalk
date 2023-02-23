import axios from "axios";

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

const aToken = getCookieValue("access_token");

const axiosConf = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${aToken}`,
  },
});

export default axiosConf;

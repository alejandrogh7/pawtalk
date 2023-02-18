import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useCookies = () => {
  const [aToken, setAToken] = useState<string>("");
  const [rToken, setRToken] = useState<string>("");

  const getTokens = () => {
    const [a, r] = [Cookies.get("access_token"), Cookies.get("refresh_token")];
    return { a, r };
  };

  useEffect(() => {
    const tokens = getTokens();

    if (tokens.a) {
      setAToken(tokens.a);
    }

    if (tokens.r) {
      setRToken(tokens.r);
    }
  }, []);

  return { aToken, rToken };
};

export default useCookies;

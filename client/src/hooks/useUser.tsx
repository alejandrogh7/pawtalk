import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../features/users/user.interface";

const useUser = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const userLocalstorage = localStorage.getItem("user");

    if (userLocalstorage) {
      setUser(JSON.parse(userLocalstorage));
    } else {
      return navigate("/signin", { replace: true });
    }
  }, []);

  return { user };
};

export default useUser;

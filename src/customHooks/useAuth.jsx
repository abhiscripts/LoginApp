import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();
export const BASE_AUTH_URL =
  "https://s0to1yt76a.execute-api.us-east-1.amazonaws.com/items";

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const login = async (data) => {
    axios.get(`${BASE_AUTH_URL}/${data.email}`).then((res) => {
      console.log(res, " response ");
      if (res.data.password === data.password) {
        setUser(data);
        navigate("/dashboard/profile", { replace: true });
      } else {
        setUser(null);
        alert("Wrong Credentials !!")
        navigate("/", { replace: true });
      }
    });
  };

  const logout = () => {
    setUser(null);
    navigate("/logout", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

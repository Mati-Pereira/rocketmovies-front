import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Signin Error");
      }
    }
  }

  function signOut() {
    localStorage.clear();
    setData({});
  }

  async function updateUser({ user, avatar }) {
    try {
      if (avatar) {
        const fileForm = new FormData();
        fileForm.append("avatar", avatar);
        const response = await api.patch("/users/avatar", fileForm);
        setData(response.data);
        localStorage.setItem(
          "@rocketmovies:user",
          JSON.stringify(response.data)
        );
      }
      const response = await api.put("/users", user);
      setData(response.data);
      localStorage.setItem("@rocketmovies:user", JSON.stringify(response.data));
      alert("Dados atualizados com sucesso");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(
          "Não foi possível atualizar. Por favor tente novamente mais tarde."
        );
      }
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("@rocketmovies:user"));
    const token = localStorage.getItem("@rocketmovies:token");

    if (user && token) {
      setData({ user: JSON.parse(user), token });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

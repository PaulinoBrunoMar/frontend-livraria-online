/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/token/", { username, password });
      console.log("🚀 ~ handleLogin ~ res:", res);
      localStorage.setItem("@Auth:livrariaToken", res.data.access);
      localStorage.setItem("@Auth:userFullName", res.data.full_name);

      navigate("/");
    } catch (error: any) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Erro ao fazer login",
        text: "Acione o suporte",
        showConfirmButton: false,
        timer: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div className="mt-8 card max-w-md mx-auto max-h-52">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded mb-2"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <button
        onClick={handleLogin}
        className="absolute bottom-0 mb-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Entrar
      </button>
    </div>
  );
}

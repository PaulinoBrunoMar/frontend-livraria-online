import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register/", { username, email, password });
      alert("Registrado! Faça login.");
      navigate("/login");
    } catch (err) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Erro ao registrar usuário",
        text: "Acione o suporte",
        showConfirmButton: false,
        timer: 3000,
      });
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Registro</h2>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-2"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

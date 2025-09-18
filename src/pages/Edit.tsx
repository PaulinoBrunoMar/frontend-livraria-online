/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Edit() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleEdit = async () => {
    try {
      const updateData: { [key: string]: string } = {};
      let res: any;

      if (email && email.trim() !== "") updateData.email = email.trim();
      if (fullName && fullName.trim() !== "")
        updateData.full_name = fullName.trim();
      if (address && address.trim() !== "") updateData.address = address.trim();

      if (Object.keys(updateData).length > 0) {
        res = await api.put("/auth/me/", updateData);
      } else {
        throw new Error("Nenhum campo válido para atualizar");
      }

      console.log("🚀 ~ handleEdit ~ res:", res);
      localStorage.setItem("@Auth:userFullName", res.data.full_name);
      Toast.fire({
        icon: "success",
        title: "Editado com sucesso",
      });
      navigate("/");
    } catch (err: any) {
      console.log("🚀 ~ handleEdit ~ err:", err);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Erro ao editar usuário",
        text: err.response.data.email && err.response.data.email,
        showConfirmButton: false,
        timer: 3000,
      });
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="card max-w-md mx-auto max-h-64">
        <h2 className="text-xl font-bold mb-4">Editar dados básicos</h2>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

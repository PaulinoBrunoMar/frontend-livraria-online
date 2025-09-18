/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../store/cartStore";
import Swal from "sweetalert2";

export default function Checkout() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total)();
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleBuy = async () => {
    const payload = {
      items: items.map((it) => ({
        book_id: it.book.id,
        quantity: it.quantity,
        price: it.price,
      })),
      total,
    };
    try {
      await api.post("/orders/", payload);
      clear();
      navigate("/orders");
    } catch (error: any) {
      Toast.fire({
        icon: "warning",
        title:
          "Você precisa estar logado para finalizar a compra, estamos de redirecionando...!",
      });
      console.error(error);
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <div className="card">
        Resumo: {items.length} itens — Total R$ {total.toFixed(2)}
      </div>
      <div className="mt-4">
        <button
          onClick={handleBuy}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";

export default function Cart() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total)();
  const remove = useCart((s) => s.remove);
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Carrinho</h2>
      <div className="space-y-4">
        {items.length === 0 && <div className="card">Carrinho vazio</div>}
        {items.map((it) => (
          <div key={it.book.id} className="card flex items-center gap-4">
            <img
              src={it.book.cover_url || "https://via.placeholder.com/80x120"}
              className="w-20 h-28 object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{it.book.title}</h3>
              <p className="text-sm text-gray-600">{it.book.authors}</p>
            </div>
            <div className="text-right">
              <p>Qtd: {it.quantity}</p>
              <p className="font-bold">
                R$ {(it.price * it.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => remove(it.book.id)}
                className="mt-2 text-red-600"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg">
          Total: <span className="font-bold">R$ {total.toFixed(2)}</span>
        </div>
        <div>
          <button
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

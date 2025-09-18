/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/orders/")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  const exportPdf = async () => {
    const el = document.getElementById("orders-list");
    if (!el) return;
    const canvas = await html2canvas(el);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("orders.pdf");
  };

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Meus Pedidos</h2>
      <div id="orders-list" className="space-y-4">
        {orders.length === 0 && (
          <div className="card">Nenhum pedido encontrado</div>
        )}
        {orders.map((o) => (
          <div key={o.id} className="card">
            <div className="flex justify-between">
              <div>
                <div>Pedido #{o.id}</div>
                <div className="text-sm text-gray-600">
                  {new Date(o.created_at).toLocaleString()}
                </div>
              </div>
              <div className="font-bold">R$ {o.total}</div>
            </div>
            <div className="mt-2">
              {o.items.map((it: any) => (
                <div key={it.id} className="flex justify-between text-sm">
                  <div>
                    {it.book.title} x{it.quantity}
                  </div>
                  <div>R$ {it.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={exportPdf}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { Book } from "../types";
import { useCart } from "../store/cartStore";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/books/${id}/`)
      .then((res) => setBook(res.data))
      .catch(() => setBook(null));
  }, [id]);

  if (!book) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <div className="details-card flex gap-4">
        <img
          src={
            book.cover_url ||
            "https://via.placeholder.com/200x320?text=No+Cover"
          }
          alt={book.title}
          className="w-48 h-72 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-sm text-gray-600">{book.authors}</p>
          <p className="mt-2">{book.synopsis}</p>
          <p className="mt-4 font-bold">R$ {book.price}</p>
          <button
            onClick={() => add(book)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

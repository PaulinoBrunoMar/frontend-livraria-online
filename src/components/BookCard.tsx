import type { Book } from "../types";
import { useCart } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function BookCard({ book }: { book: Book }) {
  const add = useCart((s) => s.add);
  return (
    <div className="card dark:bg-gray-800 text-black dark:text-white">
      <Link to={`/books/${book.id}`}>
        <img
          src={
            book.cover_url ||
            "https://via.placeholder.com/128x200?text=No+Cover"
          }
          alt={book.title}
          className="w-32 h-48 object-cover"
        />
      </Link>
      <h3 className="mt-2 font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600 dark:text-white">{book.authors}</p>
      <p className="mt-2 font-bold">R$ {book.price}</p>
      <button
        onClick={() => add(book)}
        className="absolute bottom-0 mb-3 w-11/12 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar
      </button>
    </div>
  );
}

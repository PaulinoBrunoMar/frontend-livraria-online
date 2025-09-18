import { useEffect, useState } from "react";
import api from "../services/api";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import { useSignOut } from "../util/hooks/useSignOut";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const { signOut } = useSignOut();

  const firstLoad = async () => {
    setLoading(true);
    api
      .get("/books/")
      .then((res) => setBooks(res.data))
      .catch((error) => {
        if (error.status === 401) {
          signOut();
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = async () => {
    setLoading(true);
    const res = await api.post("/books/import_google/", { q: q });
    setBooks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    firstLoad();
  }, []);

  if (loading) {
    return <Loading message="Buscando livros..." fullScreen />;
  }

  return (
    <div className="container ">
      <div className="mb-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="p-2 flex-1 border rounded"
          placeholder="Buscar por título, autor ou categoria"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.length > 0 ? (
          books.map((b) => <BookCard key={b.id} book={b} />)
        ) : (
          <h3 className="mx-8">Nenhum livro encontrado</h3>
        )}
      </div>
    </div>
  );
}

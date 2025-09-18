/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { User, Edit, LogOut, ChevronDown, MoonStar, Sun } from "lucide-react";
import { useCart } from "../store/cartStore";
import { useSignOut } from "../util/hooks/useSignOut";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../store/themeStore";

export default function Header() {
  const items = useCart((s) => s.items);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuAction = (action: any) => {
    setIsDropdownOpen(false);

    switch (action) {
      case "edit":
        navigate("/edit");
        break;
      case "theme":
        toggle();
        break;
      case "logout":
        signOut();
        break;
      default:
        break;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Páginas & Companhia - Livraria Digital
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/orders">Pedidos</Link>
          <Link to="/cart" className="relative">
            Carrinho
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2">
              {count}
            </span>
          </Link>
          |{" "}
          {localStorage.getItem("@Auth:livrariaToken") ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="flex items-center gap-2 text-white-600 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:inline">
                  Olá, {localStorage.getItem("@Auth:userFullName")}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => handleMenuAction("edit")}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Editar Perfil
                  </button>

                  <button
                    onClick={() => handleMenuAction("theme")}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                  >
                    {theme === "light" ? (
                      <MoonStar color="#041067" className="w-4 h-4" />
                    ) : (
                      <Sun color="#ccb100" className="w-4 h-4" />
                    )}
                    Alterar Tema
                  </button>

                  <hr className="my-1 border-gray-200" />

                  <button
                    onClick={() => handleMenuAction("logout")}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Entrar
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

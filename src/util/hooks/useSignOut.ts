import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return { signOut };
}

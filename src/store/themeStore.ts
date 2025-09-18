import create from "zustand";

type Theme = "light" | "dark";

export const useTheme = create<{ theme: Theme; toggle: () => void }>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  toggle: () =>
    set((s) => {
      const t = s.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", t);
      return { theme: t };
    }),
}));

import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`px-4 py-2 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        System
      </button>
    </div>
  );
}

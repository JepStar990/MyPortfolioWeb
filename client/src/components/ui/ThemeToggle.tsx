import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Check for stored theme or system preference
      const storedTheme = localStorage.getItem("theme") as "light" | "dark";
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      
      // Update localStorage
      localStorage.setItem("theme", newTheme);
      
      // Update class on html element
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newTheme;
    });
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

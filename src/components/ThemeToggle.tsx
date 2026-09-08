import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "@/providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </div>
  );
};

export default ThemeToggle;

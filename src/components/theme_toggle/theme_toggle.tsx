import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Laptop },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="theme toggle"
          title="Theme Toggle"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            className={cn({
              "bg-muted-foreground/15": theme === value,
            })}
            onClick={() => setTheme(value)}
          >
            <Icon className="mr-2 h-4 w-4 text-inherit" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Check, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

const themes = [
    {
        name: "Light",
        id: "light",
    },
    {
        name: "Dark",
        id: "dark",
    },
    {
        name: "System",
        id: "system",
    },
];

export function ThemeSelector() {
    const {theme, setTheme} = useTheme();
    return (
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <span className="hidden md:inline">
                            {themes.find(t => t.id === theme)?.name || "Theme"}
                        </span>
                        <SunMoon size={14} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Choose theme</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {themes.map((t) => (
                        <DropdownMenuItem
                            key={t.id}
                            onClick={() => setTheme(t.id as "light" | "dark" | "system")}
                            className="flex items-center justify-between"
                        >
                            {t.name}
                            {theme === t.id && <Check size={16} />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
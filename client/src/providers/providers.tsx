import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provide";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}

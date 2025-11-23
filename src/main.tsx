import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { queryClient } from "@/config/query_client";
import { Toaster } from "@/components/ui/sonner";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const themeProps: ThemeProviderProps = {
  attribute: "class",
  defaultTheme: "dark",
  enableSystem: true,
  disableTransitionOnChange: true,
  themes: ["light", "dark"],
};

createRoot(container).render(
  <>
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...themeProps}>
        <BrowserRouter>
          <App />
          <Toaster richColors />
        </BrowserRouter>
      </NextThemesProvider>
    </QueryClientProvider>
  </>
);

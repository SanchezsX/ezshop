import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect } from "react";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { init, themeParams } from "@telegram-apps/sdk-react";

init();

export const queryClient = new QueryClient();

export function RootProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    themeParams.mount();
    themeParams.bindCssVars();

    return () => themeParams.unmount();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
}

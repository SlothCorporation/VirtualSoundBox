import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ToastProvider from "@/components/Toast/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

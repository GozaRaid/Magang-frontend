import "@/styles/globals.css";
import { NavbarComponent } from "@/components/layouts/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Head from "next/head";
import { AuthProvider } from "@/features/auth/AuthContext";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noNavbarFooter = ["/admin/auth/login", "/exceptions/unauthorized"];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Head>
            <title>ICoDSA 20** | Telkom University </title>
            <meta name="description" content="ICoDSA" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/logo-icodsa-favicon.png" />
          </Head>
          <div className="flex flex-col min-h-screen">
            {!noNavbarFooter.includes(router.pathname) && <NavbarComponent />}
            <main className={`flex-grow ${inter.className}`}>
              <Component {...pageProps} />
            </main>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

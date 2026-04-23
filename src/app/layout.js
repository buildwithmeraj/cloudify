import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Montserrat } from "next/font/google";
import Providers from "./providers/Providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Cloudify",
  description: "Multi-provider media manager (currently supports Cloudinary)",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <Providers>
          <AuthProvider>
            <header>
              <Navbar />
            </header>
            <main className="grow w-full max-w-7xl mx-auto">{children}</main>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

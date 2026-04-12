import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Cloudify",
  description: "Cloudinary proxy and manager",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights or use "variable" for variable fonts
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <header>
          <Navbar />
        </header>
        <main className="grow">
          <AuthProvider>{children}</AuthProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}

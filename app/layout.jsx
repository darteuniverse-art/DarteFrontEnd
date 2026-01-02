import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "../app/StoreProvider";
import { SessionProvider } from "next-auth/react"; // <-- import SessionProvider
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "Darté. - Shop smarter",
  description: "Darté. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <SessionProvider>
          <StoreProvider>
            <Toaster />
            {children}
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

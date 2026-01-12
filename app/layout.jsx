import React from "react";

import { Outfit } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "Darté. - Shop smarter",
  description: "Darté. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased dark:bg-gray-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

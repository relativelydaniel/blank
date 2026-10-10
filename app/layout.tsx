import type { Metadata } from "next";
import { Poppins } from 'next/font/google'


import "./globals.css";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '400', '500', '600', '700', '800', '900'],
  variable: '--font-popppins', 
})

export const metadata: Metadata = {
  title: "StoreIt",
  description: "The backup storage solution",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-popppins antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

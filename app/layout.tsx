import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solid News",
  description: "Finding some news on Solid News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class" 
            defaultTheme="light" 
            disableTransitionOnChange
            enableSystem
          >
            <ToasterProvider/>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

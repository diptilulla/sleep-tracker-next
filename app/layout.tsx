import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { checkUser } from "@/lib/checkUser";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Sleep Tracker App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar/>
            
            <Suspense
              fallback={
                <div className="flex justify-center items-center min-h-[200px]">
                  <ClipLoader size={40} color="#9333ea" /> 
                </div>
              }
            >
              {children}
            </Suspense>
            <Footer/>
          </body>
        </html>
    </ClerkProvider>
  );
}

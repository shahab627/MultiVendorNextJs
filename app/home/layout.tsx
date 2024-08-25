"use client";

import { Inter } from "next/font/google";
import { Suspense } from "react";
import HomeLoading from "./loading";
import Navbar from "@/components/navbar";
import HomeContainer from "./homeContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<HomeLoading />}>
        <div className={inter.className}>
          <Navbar />
          <HomeContainer />
        </div>
      </Suspense>
    </QueryClientProvider>
  );
}

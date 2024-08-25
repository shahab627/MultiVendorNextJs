import { Inter } from "next/font/google";
import { Suspense } from "react";
import HomeLoading from "./loading";
import Navbar from "@/components/navbar";
import HomeContainer from "./homeContainer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<HomeLoading />}>
      <div className={inter.className}>
        <Navbar />
        <HomeContainer />
      </div>
    </Suspense>
  );
}

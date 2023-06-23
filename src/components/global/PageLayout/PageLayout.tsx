"use client";

import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  if (path === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

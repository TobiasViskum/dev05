"use client";

import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function PageLayout({
  profileData,
  children,
}: {
  profileData: ProfileData | null;
  children: React.ReactNode;
}) {
  const path = usePathname();

  if (path === "/pwa-start") {
    return <>{children}</>;
  }

  return (
    <>
      <Header profileData={profileData} />
      {children}
      <Footer profileData={profileData} />
    </>
  );
}

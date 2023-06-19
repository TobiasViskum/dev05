import Header from "./Header";
import Footer from "./Footer";
import { getProfileData } from "@/lib/db";

export default function PageLayout({
  profileData,
  children,
}: {
  profileData: ProfileData | null;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header profileData={profileData} />
      {children}
      <Footer profileData={profileData} />
    </>
  );
}

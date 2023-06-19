import "./globals.css";
import "./main.css";
import { Inter } from "next/font/google";
import PwaActions from "./PwaActions";
import { PageLayout } from "@/components/global";
import { Metadata } from "next";
import { getProfileData } from "@/lib/db";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Viskum App | %s",
    absolute: "Viskum App | Info",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const getUid: any = children;
  // const uid = getUid?.props?.childProp?.segment[1];

  // const profileData = uid
  //   ? uid.length === 36
  //     ? await getProfileData(uid)
  //     : null
  //   : null;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={twMerge(
          inter.className + "min-h-[100svh] w-full max-w-screen-xl bg-first"
        )}
      >
        <PageLayout profileData={null}>{children}</PageLayout>
        <PwaActions profileData={null} />
      </body>
    </html>
  );
}

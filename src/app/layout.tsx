import "./globals.css";
import "./main.css";
import { Inter } from "next/font/google";
import PwaActions from "./PwaActions";
import { BigScreenLayout, PageLayout } from "@/components/global";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import SplashScreen from "./SplashScreens";

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
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SplashScreen />
      </head>
      <body className={twMerge(inter.className, "w-full bg-first")}>
        <PageLayout>
          <BigScreenLayout>{children}</BigScreenLayout>
        </PageLayout>
        <PwaActions />
      </body>
    </html>
  );
}

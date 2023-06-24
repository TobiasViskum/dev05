"use client";

import ClientWrapper from "@/components/global/PageLayout/ClientWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  return <ClientWrapper>{children}</ClientWrapper>;
}

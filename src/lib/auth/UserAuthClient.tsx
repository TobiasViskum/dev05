"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function UserAuthClient({ uid }: { uid: string }) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    async function authenticateUser() {
      const sessionKey = localStorage.getItem("sessionKey");
      const mail = localStorage.getItem("mail");

      const response = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({
          sessionKey: sessionKey,
          mail: mail,
        }),
      });
      const result: {
        message: "success" | "failed" | "error";
        name?: string;
        uid?: string;
      } = await response.json();

      if (result.message === "failed" || result.message === "error") {
        router.push("/");
      }
    }
    authenticateUser();
  }, [path, router]);

  return <></>;
}

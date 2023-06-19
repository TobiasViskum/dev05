"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UserAuthClient({ uid }: { uid: string }) {
  const router = useRouter();

  useEffect(() => {
    async function authenticateUser() {
      const sessionKey = localStorage.getItem("sessionKey");

      const response = await fetch(`/api/login/confirm`, {
        method: "POST",
        body: JSON.stringify({
          uid: uid,
          sessionKey: sessionKey,
        }),
      });
      const data: { newRedirect: string; passed: boolean; status: string } =
        await response.json();

      if (data.passed == false) {
        router.push(data.newRedirect);
      }
    }
    authenticateUser();
  });

  return <></>;
}

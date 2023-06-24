"use client";
import { useRouter } from "next/navigation";

export default function AccountSettings() {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("mail");
    localStorage.removeItem("sessionKey");
    router.push("/");
  }

  return (
    <>
      <div>E-mail (change and view)</div>
      <div>Password (change and view)</div>
      <button
        className="flex w-36 items-center justify-center rounded-md bg-[var(--text-active)] py-2 text-center font-bold"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );
}

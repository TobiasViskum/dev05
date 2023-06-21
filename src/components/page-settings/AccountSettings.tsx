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
        className="bg-[var(--text-active)] flex w-36 text-center justify-center items-center py-2 rounded-md font-bold"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );
}

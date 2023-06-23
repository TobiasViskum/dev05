import { logo } from "@/assets/images";
import Image from "next/image";
import { ClientHandler } from "@/components/page-index";
import { twMerge } from "tailwind-merge";

export default function RootPage() {
  return (
    <>
      <div
        className={twMerge(
          "flex flex-col items-center justify-between h-[100svh] min-w-small min-h-[650px] max-h-[800px] relative w-full",
          "standalone:fixed standalone:top-0 standalone:left-4 standalone:w-[calc(100svw_-_32px)]"
        )}
      >
        <div className="font-bold text-center mt-10 flex">
          <h1 className="text-blue-600 text-5xl tn:text-7xl">Viskum</h1>
        </div>
        <ClientHandler />
        <div className="fixed top-0 w-[calc(100%_-_32px)] left-4 h-full min-h-[650px] max-h-[800px] grid place-items-center min-w-small select-none z-0">
          <div className="w-48 h-48 tn:w-64 tn:h-64 opacity-20">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="mb-4 mt-20 tn:mt-28" />
      </div>
    </>
  );
}

import { logo } from "@/assets/images";
import Image from "next/image";
import { ClientHandler } from "@/components/page-index";
import { twMerge } from "tailwind-merge";

export default function RootPage() {
  return (
    <>
      <div
        className={twMerge(
          "relative flex h-[100svh] max-h-[800px] min-h-[650px] w-full min-w-small flex-col items-center justify-between",
          "standalone:fixed standalone:left-4 standalone:top-0 standalone:w-[calc(100svw_-_32px)]"
        )}
      >
        <div className="mt-10 flex text-center font-bold">
          <h1 className="text-5xl text-blue-600 tn:text-7xl">Viskum</h1>
        </div>
        <ClientHandler />
        <div className="fixed left-4 top-0 z-0 grid h-full max-h-[800px] min-h-[650px] w-[calc(100%_-_32px)] min-w-small select-none place-items-center">
          <div className="h-48 w-48 opacity-20 tn:h-64 tn:w-64">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="mb-4 mt-20 tn:mt-28" />
      </div>
    </>
  );
}

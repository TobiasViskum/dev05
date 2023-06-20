import { logo } from "@/assets/images";
import Image from "next/image";
import { ClientHandler } from "@/components/pwa-start";

export default function PwaStart() {
  return (
    <>
      <div className="flex flex-col items-center justify-between h-[100svh] min-w-small overflow-hidden min-h-[650px] relative max-h-[800px]">
        <div className="font-bold text-center mt-10 flex">
          <h1 className="text-blue-600 text-5xl tn:text-7xl">Viskum</h1>
        </div>
        <ClientHandler />
        <div className="absolute top-0 w-[calc(100%_-_32px)] left-4 h-full grid place-items-center min-w-small select-none z-0">
          <div className="w-48 h-48 tn:w-64 tn:h-64 opacity-5">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="mb-4 mt-20 tn:mt-28" />
      </div>
    </>
  );
}

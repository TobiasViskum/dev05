import { usePathname } from "next/navigation";
import { useState } from "react";
import useChangeCurrTab from "./useChangeCurrTab";

export default function BrowserHeader() {
  const path = usePathname();
  const [currTab, setCurrTab] = useState(["", path.split("/")[1]]);

  useChangeCurrTab(setCurrTab);

  return (
    <>
      <header className="flex w-full h-full min-w-[272px] items-center justify-center border-0 border-b border-solid border-first bg-first backdrop-blur-md transition-colors">
        Hej
      </header>
    </>
  );
}

import { usePathname } from "next/navigation";
import { useState } from "react";
import useChangeCurrTab from "./useChangeCurrTab";
import { GoBack, SettingsButton } from "./BrowserHeaderContent";

export default function BrowserHeader() {
  const path = usePathname();
  const splitPath = path.split("/");

  const [currTab, setCurrTab] = useState(["", splitPath[1]]);

  useChangeCurrTab(setCurrTab);

  return (
    <>
      <header className="flex w-full h-full min-w-[272px] items-center justify-center border-0 border-b border-solid border-inactive bg-first-transparent backdrop-blur-md transition-colors">
        <nav className="h-full w-full flex justify-between items-center px-2 max-w-6xl">
          <GoBack />
          {splitPath.length === 2 ? <SettingsButton /> : <div></div>}
        </nav>
      </header>
    </>
  );
}

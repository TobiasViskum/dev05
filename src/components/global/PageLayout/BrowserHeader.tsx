import { usePathname } from "next/navigation";
import { useState } from "react";
import useChangeCurrTab from "./useChangeCurrTab";
import { GoBack, NavigationBar, SettingsButton } from "./BrowserHeaderContent";

export default function BrowserHeader() {
  const path = usePathname();
  const splitPath = path.split("/");

  const [currTab, setCurrTab] = useState(["", splitPath[1]]);

  useChangeCurrTab(setCurrTab);

  return (
    <>
      <div className="flex h-full w-full min-w-[272px] items-center justify-center border-0 border-b border-solid border-inactive bg-first-transparent backdrop-blur-md transition-colors">
        <nav className="flex h-full w-full max-w-[var(--document-max-width)] items-center justify-end gap-x-6 px-4">
          <GoBack />
          {splitPath.length === 2 ? <SettingsButton /> : <></>}
          <NavigationBar />
        </nav>
      </div>
    </>
  );
}

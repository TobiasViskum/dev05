import PwaHeader from "./PwaHeader";
import BrowserHeader from "./BrowserHeader";

export default function Header() {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-20 w-full min-w-small h-16 standalone:touch:h-12 [transform:_translateZ(0)]" //overflow-auto
      >
        <div className="w-full h-full hidden standalone:touch:block">
          <PwaHeader />
        </div>
        <div className="w-full h-full block standalone:touch:hidden">
          <BrowserHeader />
        </div>
      </div>
      <div className="mb-20 standalone:touch:mb-16" />
    </>
  );
}

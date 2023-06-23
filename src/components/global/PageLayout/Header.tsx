import PwaHeader from "./PwaHeader";
import BrowserHeader from "./BrowserHeader";

export default function Header() {
  return (
    <>
      <header
        className="sticky left-0 top-0 z-20 w-full min-w-small h-16 standalone:touch:h-12 [transform:_translateZ]" //overflow-auto
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="w-full h-full hidden standalone:touch:block relative">
          <PwaHeader />
        </div>
        <div className="w-full h-full block standalone:touch:hidden">
          <BrowserHeader />
        </div>
      </header>
      <div className="mb-4" />
    </>
  );
}

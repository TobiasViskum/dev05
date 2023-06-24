import PwaHeader from "./PwaHeader";
import BrowserHeader from "./BrowserHeader";

export default function Header() {
  return (
    <>
      <header
        className="sticky left-0 top-0 z-20 h-16 w-full min-w-small [transform:_translateZ] standalone:touch:h-12" //overflow-auto
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="relative hidden h-full w-full standalone:touch:block">
          <PwaHeader />
        </div>
        <div className="block h-full w-full standalone:touch:hidden">
          <BrowserHeader />
        </div>
      </header>
      <div className="mb-4" />
    </>
  );
}

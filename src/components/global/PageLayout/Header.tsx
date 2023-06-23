import PwaHeader from "./PwaHeader";
import BrowserHeader from "./BrowserHeader";

export default function Header() {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-20 w-full min-w-small [transform:_translate3d(0,0,0)] h-16 standalone:touch:h-12" //overflow-auto
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="w-full h-full hidden standalone:touch:block">
          <PwaHeader />
        </div>
        <div className="w-full h-full block standalone:touch:hidden">
          <BrowserHeader />
        </div>
      </div>
      <div className="mb-16" />
    </>
  );
}

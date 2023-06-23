export default function BrowserBottomShadow() {
  return (
    <>
      <div className="fixed -bottom-4 z-20 h-4 w-full shadow-[0_0_35px_60px] shadow-[var(--bg-first)] hidden browser:block" />
    </>
  );
}

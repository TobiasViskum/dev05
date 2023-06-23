import LeftNavigation from "./BigScreenLayout/LeftNavigation";

export default function BigScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex w-full justify-center px-[var(--document-padding)]">
        <div className="w-full max-w-[var(--document-max-width)] flex justify-center">
          <div className="hidden w-full xl:flex relative">
            <LeftNavigation />
          </div>
          <div className="max-w-4xl w-full xl:min-w-[892px]">{children}</div>
        </div>
      </main>
    </>
  );
}

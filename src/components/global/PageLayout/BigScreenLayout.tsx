import LeftNavigation from "./BigScreenLayout/LeftNavigation";

export default function BigScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex w-full justify-center px-[var(--document-padding)]">
        <div className="flex w-full max-w-[var(--document-max-width)] justify-center">
          <div className="relative hidden w-full xl:flex">
            <LeftNavigation />
          </div>
          <div className="w-full max-w-4xl xl:min-w-[892px]">{children}</div>
        </div>
      </main>
    </>
  );
}

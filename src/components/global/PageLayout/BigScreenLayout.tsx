import LeftNavigation from "./BigScreenLayout/LeftNavigation";
import ClientWrapper from "./ClientWrapper";

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
          <div className="w-full max-w-4xl xl:min-w-[892px]">
            <div className="hidden standalone:touch:block">
              <ClientWrapper>{children}</ClientWrapper>
            </div>
            <div className="block standalone:touch:hidden">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}

import LeftNavigation from "./BigScreenLayout/LeftNavigation";

export default function BigScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full justify-center relative gap-x-6">
        <div className="hidden w-full xl:flex relative">
          <LeftNavigation />
        </div>
        <div className="max-w-4xl min-w-[56rem] w-full">{children}</div>
      </div>
    </>
  );
}

import LeftNavigation from "./BigScreenLayout/LeftNavigation";

export default function BigScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full justify-center gap-x-6">
        <div className="hidden w-full xl:flex relative bg-red-700">
          <LeftNavigation />
        </div>
        <div className="max-w-4xl w-full xl:min-w-[892px]">{children}</div>
      </div>
    </>
  );
}

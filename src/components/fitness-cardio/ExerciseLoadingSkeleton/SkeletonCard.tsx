import { twJoin } from "tailwind-merge";

export default function SkeletonCard({
  isLast,
  isOdd,
}: {
  isLast?: boolean;
  isOdd?: boolean;
}) {
  return (
    <>
      <div className="group overflow-hidden">
        <div className="relative flex min-w-small items-center gap-x-1">
          <div
            className={twJoin(
              "mr-3 hidden h-10 w-[2px] bg-[var(--border-inactive)]",
              isOdd && "vsm:block"
            )}
          />
          <div className="relative my-1.5 grid place-items-center p-1.5">
            <div className="grid h-[72px] w-[72px] cursor-pointer grid-rows-[50%_50%] place-items-center gap-y-0 rounded-full border-4 border-solid border-inactive">
              <div className="mt-8 grid place-items-center gap-y-3">
                <div className="h-2 w-10 rounded-full bg-third" />
                <div className="h-1.5 w-8 rounded-full bg-third" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-y-1 overflow-hidden">
            <div className="h-3 w-24 rounded-full bg-third" />
            <div className="flex flex-row gap-x-3">
              <div className="mt-4 flex w-[72px] flex-col gap-y-2">
                <div className="h-1 w-8 rounded-full bg-third" />
                <div className="h-1 w-14 rounded-full bg-third" />
                <div className="h-1 w-14 rounded-full bg-third" />
              </div>
              <div className="mt-3 flex items-end gap-x-3">
                <div className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 border-solid border-[var(--bg-third)]" />
                <div className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 border-solid border-[var(--bg-third)]" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={twJoin(
            "mt-2 h-0.5 w-full rounded-full bg-[var(--border-inactive)]",
            isLast === true ? "hidden" : isLast === false ? "vsm:hidden" : ""
          )}
        />
      </div>
    </>
  );
}

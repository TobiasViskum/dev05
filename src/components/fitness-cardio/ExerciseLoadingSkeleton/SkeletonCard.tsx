import { twJoin } from "tailwind-merge";

export default function SkeletonCard({ isLast }: { isLast?: boolean }) {
  return (
    <>
      <div className="group overflow-hidden">
        <div className="relative flex min-w-small gap-x-1">
          <div className="relative my-1.5 grid place-items-center p-1.5">
            <div className="grid h-[72px] w-[72px] grid-rows-[50%_50%] gap-y-0 place-items-center rounded-full border-4 border-solid border-inactive cursor-pointer">
              <div className="grid place-items-center mt-8 gap-y-3">
                <div className="h-2 bg-third w-10 rounded-full" />
                <div className="h-1.5 bg-third w-8 rounded-full" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-y-1 overflow-hidden">
            <div className="h-3 bg-third w-24 rounded-full" />
            <div className="flex flex-row gap-x-3">
              <div className="flex w-[72px] flex-col mt-4 gap-y-2">
                <div className="h-1 bg-third w-8 rounded-full" />
                <div className="h-1 bg-third w-14 rounded-full" />
                <div className="h-1 bg-third w-14 rounded-full" />
              </div>
              <div className="flex items-end gap-x-3 mt-3">
                <div className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 border-solid border-[var(--bg-third)]" />
                <div className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 border-solid border-[var(--bg-third)]" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={twJoin(
            "mt-2 w-full bg-[var(--border-inactive)] h-0.5 rounded-full",
            isLast === true ? "hidden" : isLast === false ? "vsm:hidden" : ""
          )}
        />
      </div>
    </>
  );
}

import SkeletonCard from "./SkeletonCard";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="group mt-3 flex w-[calc(100%_-_32px)] min-w-small flex-col items-center first:mt-0">
        <div className="grid h-7 w-full place-items-center rounded-full bg-second text-center text-lg" />
        <div className="relative w-full animate-pulse">
          <div className="absolute -top-5 h-3 w-1/3 translate-x-full rounded-full bg-third" />
          <div className="relative grid w-full grid-cols-1 gap-x-3 transition-all vsm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard isOdd />
            <SkeletonCard isLast />
          </div>
        </div>
        <div className="mt-8 grid h-7 w-full place-items-center rounded-full bg-second text-center text-lg" />
        <div className="relative w-full animate-pulse">
          <div className="absolute -top-5 h-3 w-1/3 translate-x-full rounded-full bg-third" />
          <div className="relative grid w-full grid-cols-1 gap-x-3 transition-all vsm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard isOdd />
            <SkeletonCard />
            <SkeletonCard isOdd />
            <SkeletonCard isLast={false} />
            <SkeletonCard isLast isOdd />
          </div>
        </div>
      </div>
    </>
  );
}

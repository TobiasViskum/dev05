import SkeletonCard from "./SkeletonCard";

export default function RepsMaxLoadingSkeleton() {
  return (
    <>
      <div className="group mt-3 flex min-w-small flex-col items-center first:mt-0 fixed w-[calc(100%_-_32px)]">
        <button className="grid w-full place-items-center rounded-full bg-second text-center text-lg h-7" />
        <div className="relative w-full animate-pulse">
          <div className="h-3 w-1/3 bg-third rounded-full absolute -top-5 translate-x-full" />
          <div className="relative grid w-full grid-cols-1 gap-x-3 transition-all vsm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard isLast />
          </div>
        </div>
        <button className="grid w-full place-items-center rounded-full bg-second text-center text-lg h-7 mt-8" />
        <div className="relative w-full animate-pulse">
          <div className="h-3 w-1/3 bg-third rounded-full absolute -top-5 translate-x-full" />
          <div className="relative grid w-full grid-cols-1 gap-x-3 transition-all vsm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard isLast={false} />
            <SkeletonCard isLast />
          </div>
        </div>
      </div>
    </>
  );
}

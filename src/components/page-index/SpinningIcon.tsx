import { LoadingSpinner } from "../global";

export default function SpinningIcon() {
  return (
    <>
      <LoadingSpinner opacity="opacity-100" />
      <div className="absolute bottom-8 left-1/2 flex w-full min-w-small -translate-x-1/2 -translate-y-1/2 flex-col gap-x-1 text-center">
        <p>Made by:</p>
        <p className="made-by-text font-bold">Tobias Tranberg Viskum</p>
      </div>
    </>
  );
}

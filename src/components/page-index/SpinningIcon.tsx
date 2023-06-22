import { LoadingSpinner } from "../global";

export default function SpinningIcon() {
  return (
    <>
      <LoadingSpinner opacity="opacity-100" />
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-x-1 flex-col text-center w-full min-w-small">
        <p>Made by:</p>
        <p className="font-bold made-by-text">Tobias Tranberg Viskum</p>
      </div>
    </>
  );
}

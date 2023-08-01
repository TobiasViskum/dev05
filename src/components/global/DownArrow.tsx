export default function DownArrow({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <svg
      className="bg-transparent stroke-transparent"
      height="24"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      width="24"
      style={{
        width: width,
        height: height,
      }}
    >
      <path d="M6 9l6 6 6-6"></path>
    </svg>
  );
}

import { twMerge } from "tailwind-merge";

interface BoxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function Box({ className, children, ...props }: BoxProps) {
  return (
    <>
      <div
        className={twMerge(
          className,
          "rounded-md border border-solid border-inactive bg-first"
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

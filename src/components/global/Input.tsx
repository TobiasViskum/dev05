import { twMerge } from "tailwind-merge";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <>
      <input
        className={twMerge(
          `rounded-md border border-solid border-inactive bg-transparent placeholder-[var(--text-second)] focus:outline-none`,
          className
        )}
        {...props}
      />
    </>
  );
}

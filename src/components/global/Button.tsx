"use client";

import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <>
      <button
        className={twMerge(
          "rounded-md border border-solid border-inactive bg-first py-2 font-semibold text-active transition-colors hover:bg-third",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
}

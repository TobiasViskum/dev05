"use client";

import { forwardRef, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  styling?: {
    main?: string;
    mainFocus?: string;
  };
  important?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, important, styling, ...props },
  ref
) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={twMerge(
          "w-full rounded-md bg-black p-1 text-center ring-1 ring-neutral-800 focus:outline focus:outline-1 focus:outline-blue-500",
          styling?.main,
          "",
          styling?.mainFocus
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
});

export default Button;

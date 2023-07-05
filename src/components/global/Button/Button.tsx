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
    mainClass?: string;
    mainFocusClass?: string;
  };
  important?: boolean;
  insideModal?: boolean;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, insideModal, important, onClick, styling, ...props },
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
        onKeyDown={(e) => {
          if (insideModal && buttonRef.current) {
            if (e.key === "Enter" || e.key === " ") {
              const event: React.MouseEvent<HTMLButtonElement, MouseEvent> = {
                target: buttonRef.current,
                currentTarget: buttonRef.current,
                // Add any other properties you need
              } as any;
              onClick && onClick(event);
              e.preventDefault();
            }
          }
        }}
        onClick={onClick}
        className={twMerge(
          "w-full rounded-md bg-black p-1 text-center ring-1 ring-neutral-800 focus:outline focus:outline-1 focus:outline-blue-500",
          styling?.mainClass,
          "",
          styling?.mainFocusClass
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
});

export default Button;

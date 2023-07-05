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
          "rounded-md border border-solid border-inactive bg-black text-center focus:outline focus:outline-1 focus:outline-[var(--text-active)]",
          styling?.main
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
});

export default Button;

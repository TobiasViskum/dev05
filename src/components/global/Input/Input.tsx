"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useRef } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, children, ...props },
  ref
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
        className={twMerge(
          "rounded-md border border-solid bg-white py-0.5 text-center text-sm text-black placeholder-gray-500 outline-none",
          className
        )}
      />
    </>
  );
});

export default Input;

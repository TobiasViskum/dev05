"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useRef, useState, useEffect } from "react";

interface DialogProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  children?: React.ReactNode;
  closed?: boolean;
  blockScroll?: boolean;
  closable?: boolean;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  {
    className,
    children,
    closed,
    blockScroll = true,
    closable = true,
    ...props
  },
  ref
) {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [canBeClosed, setCanBeClosed] = useState(true);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function onTransitionEnd(e: TransitionEvent) {
    if (e.target === dialogRef.current) {
      if (dialogRef.current) {
        dialogRef.current.close();
        setCloseAnimation(false);
      }
    }
  }

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.addEventListener("transitionend", onTransitionEnd);
      dialogRef.current.addEventListener("animationstart", (e) => {
        if (e.target === dialogRef.current) {
          setCanBeClosed(false);
        }
      });
      dialogRef.current.addEventListener("animationend", (e) => {
        if (e.target === dialogRef.current) {
          setCanBeClosed(true);
        }
      });
    }
    if (closed) {
      setCloseAnimation(true);
    }
  }, [closed]);

  useEffect(() => {
    if (blockScroll) {
      if (dialogRef.current?.open === true) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
      }
    }
  }, [closeAnimation, canBeClosed, blockScroll]);

  function onClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (canBeClosed && closable) {
      const target = e.target as HTMLDialogElement;

      const dialogDimensions = target.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        if (dialogRef.current) {
          setCloseAnimation(true);
        }
      }
    }
  }

  return (
    <>
      <dialog
        onClick={onClick}
        ref={(node) => {
          dialogRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
        className={twMerge(
          "overflow-hidden bg-white p-0 text-center transition-opacity duration-200 backdrop:transition-colors backdrop:duration-200",
          closeAnimation
            ? "opacity-0 backdrop:bg-opacity-0 backdrop:backdrop-blur-0"
            : "opacity-100 backdrop:bg-black backdrop:bg-opacity-50 backdrop:backdrop-blur-[1px] open:animate-fade-in open:backdrop:animate-fade-in",
          className
        )}
      >
        {children}
      </dialog>
    </>
  );
});

export default Dialog;

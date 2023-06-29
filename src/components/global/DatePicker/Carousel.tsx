import {
  useMemo,
  Children,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { DatePickerContext } from "./ContextProvider";

export default function Carousel({
  children,
  handleAction,
  forceUpdate,
  dateAndTranslate,
  changeCurrentDate,
}: {
  children: React.ReactNode;
  handleAction: (action: "forwards" | "backwards") => void;
  forceUpdate: boolean;
  dateAndTranslate: { year: number; month: number; translateX: number };
  changeCurrentDate: (action: "forwards" | "backwards") => void;
}) {
  const context = useContext(DatePickerContext);

  const [translateX, setTranslateX] = useState(dateAndTranslate.translateX);
  const transitionTransform = useRef<string>("transition-transform");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const prevForceUpdate = useRef<boolean>(false);

  function getTranslateX(newX: number) {
    return [(-newX).toString(), "%"].join("");
  }

  useEffect(() => {
    transitionTransform.current = "";
    setTimeout(() => {
      setTranslateX(dateAndTranslate.translateX);
    }, 5);
  }, [dateAndTranslate]);

  useEffect(() => {
    if (prevForceUpdate.current != forceUpdate) {
      prevForceUpdate.current = forceUpdate;
      transitionTransform.current = "transition-transform";
      setTranslateX(
        context.action === "forwards"
          ? (prev) => prev + 110
          : context.action === "backwards"
          ? (prev) => prev - 110
          : 0
      );
    }
  }, [handleAction, context.action]);

  useEffect(() => {
    function onTransitionEnd() {
      if (translateX !== 0) {
        transitionTransform.current = "";
        if (context.action === "forwards" || context.action === "backwards") {
          changeCurrentDate(context.action);
        }
      }
    }

    if (carouselRef.current) {
      carouselRef.current.addEventListener("transitionend", onTransitionEnd, {
        once: true,
      });
    }
  }, [translateX]);

  return (
    <>
      <div
        ref={carouselRef}
        className={`grid grid-flow-col gap-y-2 ${transitionTransform.current}`}
        style={{ transform: `translateX(${getTranslateX(translateX)})` }}
      >
        {children}
      </div>
    </>
  );
}

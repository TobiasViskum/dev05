"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useState, useRef, useEffect } from "react";
import { Dialog } from "@/components/global/Dialog";
import DateNodes from "./DateNodes";
import { StylingProps } from "./types";
import WeekDays from "./WeekDays";
import { getFutureDate } from "./functions";
import DateNodesContent from "./DateNodesContent";

interface DatePickerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  styling?: StylingProps;
  onDateChange?: (e: Date) => void;
  startDate?: Date;
}

const DatePicker = forwardRef<HTMLDialogElement, DatePickerProps>(
  function DatePicker(
    { className, styling, onDateChange, startDate, ...props },
    ref
  ) {
    const [currDate, setCurrDate] = useState({
      year: startDate ? startDate.getFullYear() : new Date().getFullYear(),
      month: startDate ? startDate.getMonth() : new Date().getMonth(),
    });
    const [activeDateNode, setActiveDateNode] = useState(
      startDate ? startDate : null
    );

    const currAction = useRef<"backwards" | "forwards" | "">("");

    const dateNodesHolderRef = useRef<HTMLDivElement | null>(null);
    const datePickerRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
      datePickerRef.current?.addEventListener("close", (e: Event) => {
        if (startDate === undefined) {
          setActiveDateNode(null);
          setCurrDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
          });
        } else if (startDate) {
          setActiveDateNode(startDate);
          setCurrDate({
            year: startDate.getFullYear(),
            month: startDate.getMonth(),
          });
        }
      });
    }, [startDate]);

    const mainClass = "bg-white text-black text-center py-3 rounded-lg";
    const dateNodeClass =
      "rounded-full bg-gray-600 bg-opacity-0 hover:dt:bg-opacity-25";
    const dateNodeActiveClass =
      "bg-gray-600 bg-opacity-50 hover:dt:bg-opacity-75";
    const weekDayTextClass = "";

    function changeCurrentDate(action: "backwards" | "forwards") {
      currAction.current = action;
      setCurrDate({
        year: getFutureDate("year", action, currDate),
        month: getFutureDate("month", action, currDate),
      });
    }

    return (
      <>
        <Dialog
          className={twMerge(mainClass, className, "min-w-[272px]")}
          {...props}
          ref={(node) => {
            datePickerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
        >
          <div className="flex justify-center gap-x-10 pb-1">
            <button
              className="w-4 bg-blue-500"
              onClick={() => changeCurrentDate("backwards")}
            >
              B
            </button>
            <p>
              Y: {currDate.year} - M: {currDate.month}
            </p>
            <button
              className="w-4 bg-blue-500"
              onClick={() => changeCurrentDate("forwards")}
            >
              F
            </button>
          </div>
          <div className="flex flex-col">
            <div className="grid justify-center gap-y-2 overflow-hidden">
              <div className="relative flex h-52 justify-center">
                <div className="absolute grid gap-y-2">
                  <WeekDays
                    props={{
                      styling: styling,
                      weekDayTextClass: weekDayTextClass,
                    }}
                  />
                  <DateNodesContent
                    currDate={currDate}
                    currAction={currAction.current}
                    activeDateNode={activeDateNode}
                    dateNodeActiveClass={dateNodeActiveClass}
                    dateNodeClass={dateNodeClass}
                    onDateChange={onDateChange}
                    setActiveDateNode={setActiveDateNode}
                    styling={styling}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
);

export default DatePicker;

"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useState, useRef, useEffect } from "react";
import { Dialog } from "@/components/global/Dialog";
import DateNodes from "./DateNodes";
import { StylingProps } from "./types";
import WeekDays from "./WeekDays";
import { compareDates, getFutureDate } from "./functions";
import DateNodesContent from "./DateNodesContent";
import Carousel from "./Carousel";
import ContextProvider from "./ContextProvider";
import getTableData from "./getTableData";

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

    const [forceUpdate, setForceUpdate] = useState(false);
    const currAction = useRef<"backwards" | "forwards" | "">("");
    const [dateAndTranslate, setDateAndTranslate] = useState({
      year: startDate ? startDate.getFullYear() : new Date().getFullYear(),
      month: startDate ? startDate.getMonth() : new Date().getMonth(),
      translateX: 0,
    });

    const canSwitchMonth = useRef<boolean>(true);
    const datePickerRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
      datePickerRef.current?.addEventListener("close", (e: Event) => {
        if (startDate === undefined) {
          setActiveDateNode(null);
          setDateAndTranslate({
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            translateX: 0,
          });
        } else if (startDate) {
          setActiveDateNode(startDate);
          setDateAndTranslate({
            year: startDate.getFullYear(),
            month: startDate.getMonth(),
            translateX: 0,
          });
        }
      });
    }, [startDate]);

    const mainClass = "bg-white text-black text-center pt-3 rounded-lg";
    const dateNodeClass =
      "rounded-full bg-gray-600 bg-opacity-0 hover:dt:bg-opacity-25";
    const dateNodeActiveClass =
      "bg-gray-600 bg-opacity-50 hover:dt:bg-opacity-75";
    const weekDayTextClass = "";

    function changeCurrentDate(action: "backwards" | "forwards") {
      setTimeout(() => {
        setDateAndTranslate({
          year: getFutureDate("year", action, dateAndTranslate),
          month: getFutureDate("month", action, dateAndTranslate),
          translateX: 0,
        });
      }, 100);
    }

    function handleAction(action: "backwards" | "forwards") {
      if (canSwitchMonth.current) {
        canSwitchMonth.current = false;
        setForceUpdate((prev) => !prev);
        currAction.current = action;
        changeCurrentDate(action);
        setTimeout(() => {
          canSwitchMonth.current = true;
        }, 250);
      }
    }

    return (
      <ContextProvider
        classes={{ mainClass: "" }}
        action={currAction.current}
        currDate={currDate}
      >
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
              onClick={() => handleAction("backwards")}
            >
              B
            </button>
            <p>
              Y: {dateAndTranslate.year} - M: {dateAndTranslate.month}
            </p>
            <button
              className="w-4 bg-blue-500"
              onClick={() => handleAction("forwards")}
            >
              F
            </button>
          </div>
          <div className="flex flex-col">
            <div className="grid justify-center gap-y-2 overflow-hidden">
              <div className="relative flex h-64 justify-center">
                <div className="absolute grid gap-y-2">
                  <WeekDays
                    props={{
                      styling: styling,
                      weekDayTextClass: weekDayTextClass,
                    }}
                  />
                  <Carousel
                    handleAction={handleAction}
                    forceUpdate={forceUpdate}
                    dateAndTranslate={dateAndTranslate}
                    changeCurrentDate={changeCurrentDate}
                  >
                    <div
                      className="absolute grid gap-y-2"
                      style={{ transform: "translateX(-110%)" }}
                    >
                      {getTableData(
                        getFutureDate("year", "backwards", dateAndTranslate),
                        getFutureDate("month", "backwards", dateAndTranslate)
                      ).map((weekRow, index1) => {
                        return (
                          <div
                            key={index1}
                            className="grid grid-flow-col gap-x-2"
                          >
                            {Object.keys(weekRow).map((dateNode, index2) => {
                              const noteDate = new Date(
                                getFutureDate(
                                  "year",
                                  "backwards",
                                  dateAndTranslate
                                ),
                                getFutureDate(
                                  "month",
                                  "backwards",
                                  dateAndTranslate
                                ),
                                weekRow[index2]
                              );

                              return (
                                <button
                                  key={index2}
                                  className={twMerge(
                                    dateNodeClass,
                                    styling?.dateNode,
                                    compareDates(activeDateNode, noteDate) &&
                                      dateNodeActiveClass,
                                    compareDates(activeDateNode, noteDate) &&
                                      styling?.dateNodeActive,
                                    "aspect-square w-7 text-sm"
                                  )}
                                  // onClick={() => {
                                  //   handleClick(noteDate);
                                  // }}
                                >
                                  {weekRow[index2]}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <div className="absolute grid gap-y-2">
                      {getTableData(
                        dateAndTranslate.year,
                        dateAndTranslate.month
                      ).map((weekRow, index1) => {
                        return (
                          <div
                            key={index1}
                            className="grid grid-flow-col gap-x-2"
                          >
                            {Object.keys(weekRow).map((dateNode, index2) => {
                              const noteDate = new Date(
                                dateAndTranslate.year,
                                dateAndTranslate.month,
                                weekRow[index2]
                              );

                              return (
                                <button
                                  key={index2}
                                  className={twMerge(
                                    dateNodeClass,
                                    styling?.dateNode,
                                    compareDates(activeDateNode, noteDate) &&
                                      dateNodeActiveClass,
                                    compareDates(activeDateNode, noteDate) &&
                                      styling?.dateNodeActive,
                                    "aspect-square w-7 text-sm"
                                  )}
                                  // onClick={() => {
                                  //   handleClick(noteDate);
                                  // }}
                                >
                                  {weekRow[index2]}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="absolute grid gap-y-2"
                      style={{ transform: "translateX(110%)" }}
                    >
                      {getTableData(
                        getFutureDate("year", "forwards", dateAndTranslate),
                        getFutureDate("month", "forwards", dateAndTranslate)
                      ).map((weekRow, index1) => {
                        return (
                          <div
                            key={index1}
                            className="grid grid-flow-col gap-x-2"
                          >
                            {Object.keys(weekRow).map((dateNode, index2) => {
                              const noteDate = new Date(
                                getFutureDate(
                                  "year",
                                  "forwards",
                                  dateAndTranslate
                                ),
                                getFutureDate(
                                  "month",
                                  "forwards",
                                  dateAndTranslate
                                ),
                                weekRow[index2]
                              );

                              return (
                                <button
                                  key={index2}
                                  className={twMerge(
                                    dateNodeClass,
                                    styling?.dateNode,
                                    compareDates(activeDateNode, noteDate) &&
                                      dateNodeActiveClass,
                                    compareDates(activeDateNode, noteDate) &&
                                      styling?.dateNodeActive,
                                    "aspect-square w-7 text-sm"
                                  )}
                                  // onClick={() => {
                                  //   handleClick(noteDate);
                                  // }}
                                >
                                  {weekRow[index2]}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </ContextProvider>
    );
  }
);

export default DatePicker;

{
  /* <DateNodesContent
                    currDate={currDate}
                    currAction={currAction.current}
                    activeDateNode={activeDateNode}
                    dateNodeActiveClass={dateNodeActiveClass}
                    dateNodeClass={dateNodeClass}
                    onDateChange={onDateChange}
                    setActiveDateNode={setActiveDateNode}
                    styling={styling}
                  /> */
}

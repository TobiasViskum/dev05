"use client";
import { twMerge } from "tailwind-merge";
import getTableData from "./getTableData";
import { forwardRef, useRef, useState, useEffect } from "react";
import { Dialog } from "@/components/global/Dialog";

interface StylingProps {
  tw?: string;
}

interface DatePickerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  styling?: StylingProps;
}

const DatePicker = forwardRef<HTMLDialogElement, DatePickerProps>(
  function DatePicker({ className, styling, ...props }, ref) {
    const tableData = getTableData();

    const mainClass = "";

    return (
      <>
        <Dialog className={twMerge(className, mainClass)} {...props} ref={ref}>
          <div>Month and year switcher</div>
        </Dialog>
      </>
    );
  }
);

export default DatePicker;

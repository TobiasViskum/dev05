"use client";
import { DatePicker } from "@/components/global/DatePicker";
import { useRef, useState } from "react";
import { Dialog } from "@/components/global/Dialog";
export default function ModalText() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datePickerRef = useRef<HTMLDialogElement | null>(null);

  setTimeout(() => {
    setIsModalOpen(true);
  }, 1000);

  function onDateChange(e: Date) {
    console.log(e);
  }

  return (
    <>
      <DatePicker
        ref={datePickerRef}
        className=""
        onDateChange={onDateChange}
        startDate={new Date(2023, 2, 5)}
      >
        hej
      </DatePicker>
      <button onClick={() => datePickerRef.current?.showModal()}>
        Click Me
      </button>
    </>
  );
}

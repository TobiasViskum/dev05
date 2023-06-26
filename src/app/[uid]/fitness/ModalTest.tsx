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

  return (
    <>
      <Dialog ref={datePickerRef} className="bg-red-300" />
      <button onClick={() => datePickerRef.current?.showModal()}>
        Click Me
      </button>
    </>
  );
}

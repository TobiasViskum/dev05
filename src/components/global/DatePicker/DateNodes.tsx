import { twMerge } from "tailwind-merge";
import { compareDates } from "./functions";
import { StylingProps } from "./types";
import getTableData from "./getTableData";
import { useRef } from "react";

interface Props {
  props: {
    year: number;
    month: number;
    dateNodeClass: string;
    styling: StylingProps | undefined;
    activeDateNode: Date | null;
    setActiveDateNode: React.Dispatch<React.SetStateAction<Date | null>>;
    dateNodeActiveClass: string;
    onDateChange: ((e: Date) => void) | undefined;
  };
}

export default function DateNodes({ props }: Props) {
  const year = props.year;
  const month = props.month;
  const dateNodeClass = props.dateNodeClass;
  const styling = props.styling;
  const activeDateNode = props.activeDateNode;
  const dateNodeActiveClass = props.dateNodeActiveClass;
  const setActiveDateNode = props.setActiveDateNode;
  const onDateChange = props.onDateChange;

  const tableData = useRef(getTableData(year, month));

  function handleClick(noteDate: Date) {
    if (compareDates(activeDateNode, noteDate)) {
      setActiveDateNode(null);
    } else {
      setActiveDateNode(noteDate);
      if (onDateChange) {
        onDateChange(noteDate);
      }
    }
  }

  return (
    <>
      {tableData.current.map((weekRow, index1) => {
        return (
          <div key={index1} className="grid grid-flow-col gap-x-2">
            {Object.keys(weekRow).map((dateNode, index2) => {
              const noteDate = new Date(year, month, weekRow[index2]);

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
                  onClick={() => {
                    handleClick(noteDate);
                  }}
                >
                  {weekRow[index2]}
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

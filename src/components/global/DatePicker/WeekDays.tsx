import { twMerge } from "tailwind-merge";
import { StylingProps } from "./types";

interface Props {
  props: { weekDayTextClass: string; styling: StylingProps | undefined };
}

export default function WeekDays({ props }: Props) {
  const weekDayTextClass = props.weekDayTextClass;
  const styling = props.styling;

  const weekNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const defaultClass = "aspect-square w-7";

  return (
    <div className="grid grid-flow-col gap-x-2 border-t border-solid pt-1 font-semibold">
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[0]}
      </p>
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[1]}
      </p>
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[2]}
      </p>
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[3]}
      </p>
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[4]}
      </p>
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[5]}
      </p>
      <p
        className={twMerge(
          weekDayTextClass,
          styling?.weekDayText,
          defaultClass
        )}
      >
        {weekNames[6]}
      </p>
    </div>
  );
}

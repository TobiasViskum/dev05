import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import { twJoin } from "tailwind-merge";

export default function InfoBox({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const path = usePathname();
  const splitPath = path.split("/");
  const exerciseType = splitPath[splitPath.length - 1];

  const tw = "text-2xs";
  function getRepRange() {
    if (exerciseType === "reps") {
      if (
        exerciseData.reps_range_name === null ||
        exerciseData.reps_range_name.toLowerCase() === "none"
      ) {
        return <p className={tw}>-</p>;
      } else {
        return <p className={tw}>{exerciseData.reps_range_name} reps</p>;
      }
    }
  }
  function getDate() {
    if (exerciseType === "reps") {
      if (exerciseData.updated_date_reps !== null) {
        const date = new Date(exerciseData.updated_date_reps);
        const formattedDate = dayjs(date).format("MM-DD-YYYY");
        return <p className={tw}>{formattedDate}</p>;
      } else return <p className={tw}>-</p>;
    } else if (exerciseType === "max") {
      if (exerciseData.updated_date_max !== null) {
        const date = new Date(exerciseData.updated_date_max);
        const formattedDate = dayjs(date).format("MM-DD-YYYY");
        return <p className={tw}>{formattedDate}</p>;
      } else return <p className={tw}>-</p>;
    }
  }
  function getCompeting() {
    if (exerciseType === "max") {
      if (exerciseData.is_competing === 1) {
        return <p className={twJoin(tw, "text-green-500")}>Competing</p>;
      } else return <p className={twJoin(tw, "text-red-500")}>Competing</p>;
    }
  }

  return (
    <div className="flex w-[72px] flex-col">
      <p className="text-2xs text-second underline">Info</p>
      {getRepRange()}
      {getDate()}
      {getCompeting()}
    </div>
  );
}

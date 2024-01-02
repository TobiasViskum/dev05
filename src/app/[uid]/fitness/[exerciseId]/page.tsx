import { execute } from "@/lib/db";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { Content } from "./Content";

export default async function page({ params }: ExtendedViskumAppParams) {
  const uid = params.uid;
  const exerciseId = params.exerciseId;

  const exercise = (
    await execute<FitnessData[]>("SELECT * FROM fitness_stat_table WHERE uid=? AND id=?", [
      uid,
      exerciseId,
    ])
  )[0];

  return <Content strFitnessData={JSON.stringify(exercise)} />;
}

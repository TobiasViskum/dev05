import Link from "next/link";
import { Metadata } from "next";
import { db } from "@/db";
import { execute } from "@/lib/db";
import { ChangePoint } from "./ChangePoint";

export const metadata: Metadata = {
  title: "Dog",
};

export default async function page({ params }: ViskumAppParams) {
  const uid = params.uid;

  let res = await execute<Dog[]>("SELECT * FROM hund_stat_table");

  function getPoints(profile: "Tobias" | "Andreas"): number {
    let obj = res.find((obj) => obj.profile == profile);

    if (obj) {
      return obj.points;
    }
    return -1;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold">Hund page</h1>
      <div className="space-y-4">
        <h2 className="text-3xl">{"Tobias' og Andreas' pointsystem:"}</h2>
        <div className="flex gap-x-4">
          <div className="flex flex-col items-center py-4 px-8 border rounded-md border-neutral-800">
            <p className="font-bold text-xl">Tobias</p>
            <div className="flex gap-x-4 my-2">
              <ChangePoint profile="Tobias" changeType="increment" />
              <ChangePoint profile="Tobias" changeType="decrement" />
            </div>
            <p className="text-4xl rounded-full ">{getPoints("Tobias")}</p>
          </div>
          <div className="flex flex-col items-center py-4 px-8 border rounded-md border-neutral-800">
            <p className="font-bold text-xl">Andreas</p>
            <div className="flex gap-x-4 my-2">
              <ChangePoint profile="Andreas" changeType="increment" />
              <ChangePoint profile="Andreas" changeType="decrement" />
            </div>
            <p className="text-4xl rounded-full ">{getPoints("Andreas")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

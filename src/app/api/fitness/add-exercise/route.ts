import { execute } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const profile = body.profile;
  const name = body.name;
  const addMax = body.addMax;
  const addReps = body.addReps;

  let duplicateCommand = "";

  if (addMax == 1 && addReps == 1) {
    duplicateCommand = "has_max=1, has_reps=1";
  } else if (addMax == 1) {
    duplicateCommand = "has_max=1";
  } else if (addReps == 1) {
    duplicateCommand = "has_reps=1";
  }

  await execute(
    `INSERT INTO fitness_stat_table SET uid=(?), profile=(?), name=(?), has_max=(?), has_reps=(?), unit_id=1 ON DUPLICATE KEY UPDATE ${duplicateCommand}`,
    [profile, profile, name, addMax, addReps]
  );

  return NextResponse.json({ success: true });
}

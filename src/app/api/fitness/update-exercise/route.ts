import { execute } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const profile = body.profile;
  const id = body.id;
  const newName = body.newName;
  const isCompeting = body.isCompeting;
  const isReps = body.isReps;
  const isMax = body.isMax;
  const isLocked = body.isLocked;

  await execute(
    "UPDATE fitness_stat_table SET name=?, is_competing=?, has_reps=?, has_max=?, is_date_locked=? WHERE uid=? AND id=?",
    [newName, !!isCompeting, !!isReps, !!isMax, !!isLocked, profile, id]
  );

  return NextResponse.json({ success: true });
}

import { execute } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const profile = body.profile;
  const id = body.id;

  await execute("DELETE FROM fitness_stat_table WHERE uid=? AND id=?", [profile, id]);

  return NextResponse.json({ success: true });
}

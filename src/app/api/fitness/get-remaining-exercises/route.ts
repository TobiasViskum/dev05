import { execute } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const profile = req.nextUrl.searchParams.get("profile");

  const res = await execute<FitnessData[]>(
    "SELECT DISTINCT a.name FROM fitness_stat_table AS a WHERE a.profile != ?",
    [profile]
  );

  return NextResponse.json({ data: res });
}

import { execute } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const changeType = req.nextUrl.searchParams.get("changeType");
  const profile = req.nextUrl.searchParams.get("profile");

  if (changeType === "increment") {
    await execute("UPDATE hund_stat_table SET points = points + 1 WHERE profile=?", [profile]);
  } else {
    await execute("UPDATE hund_stat_table SET points = points - 1 WHERE profile=?", [profile]);
  }

  return NextResponse.json({});
}

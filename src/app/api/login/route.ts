import { execute } from "@/lib/db";
import z from "zod";
import { NextRequest, NextResponse } from "next/server";

const routeSchema = z.object({
  input: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ success: false, status: "error" });

  const input = parsed.data.input;

  const q = "SELECT * FROM dim_profile WHERE mail=(?)";
  const val = [input];

  const result = await execute<ProfilesNoJoin[]>(q, val);

  if (result.length === 0)
    return NextResponse.json({ success: false, status: "error" });

  const uid = result[0].uid;

  return NextResponse.json({ success: true, uid: uid, status: "success" });
}

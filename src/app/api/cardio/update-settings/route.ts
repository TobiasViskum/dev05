import updateSettings from "@/lib/db/cardio/updateSettings";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";

const routeSchema = z.object({
  id: z.number(),
  profileGroupUid: z.string(),
  disciplineId: z.number(),
  newName: z.string(),
  newGroup: z.string(),
  newUnit: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "error", message: "Wrong schema" });

  await updateSettings(parsed.data);

  return NextResponse.json({ status: "success", message: "" });
}

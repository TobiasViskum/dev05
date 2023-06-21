import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";
import updateUnit from "@/lib/db/fitness/updateUnit";

const routeSchema = z.object({
  id: z.number(),
  newUnit: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "error", message: "" });

  await updateUnit(parsed.data);

  return NextResponse.json({ status: "success", message: "" });
}

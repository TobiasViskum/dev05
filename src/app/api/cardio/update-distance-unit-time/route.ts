import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";
import { updateDistanceUnitTime } from "@/lib/db/cardio";

const routeSchema = z.object({
  id: z.number(),
  newDistance: z.number(),
  newUnit: z.string(),
  newTime: z.object({
    hours: z.number(),
    minutes: z.number(),
    seconds: z.number(),
  }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "error", message: "" });

  await updateDistanceUnitTime(parsed.data);

  return NextResponse.json({ status: "success", message: "" });
}

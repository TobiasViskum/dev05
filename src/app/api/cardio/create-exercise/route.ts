import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";
import { createExercise } from "@/lib/db/cardio";

const routeSchema = z.object({
  uid: z.string(),
  name: z.string(),
  discipline: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "error", message: "" });

  await createExercise(parsed.data);

  return NextResponse.json({ status: "success", message: "" });
}

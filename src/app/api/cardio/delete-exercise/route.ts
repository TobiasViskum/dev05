import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";
import { deleteExercise } from "@/lib/db/cardio";

const routeSchema = z.object({
  id: z.number(),
  uid: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "Error", message: "Wrong schema" });

  await deleteExercise(parsed.data);

  return NextResponse.json({ status: "Success", message: "" });
}

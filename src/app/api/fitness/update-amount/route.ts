import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";
import updateAmount from "@/lib/db/fitness/updateAmount";

const routeSchema = z.object({
  id: z.number(),
  newAmount: z.number(),
  type: z.enum(["max", "reps"]),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "error", message: "" });

  await updateAmount(parsed.data);

  return NextResponse.json({ status: "success", message: "" });
}

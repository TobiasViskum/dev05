import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import z from "zod";
import updateLock from "@/lib/db/fitness/updateLock";

const routeSchema = z.object({
  id: z.number(),
  newState: z.number(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ status: "error", message: "" });

  await updateLock(parsed.data);

  return NextResponse.json({ status: "success", message: "" });
}

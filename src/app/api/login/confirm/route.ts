import { NextRequest, NextResponse } from "next/server";
import { generateSessionKey } from "@/lib/auth";
import z from "zod";

const routeSchema = z.object({
  uid: z.string(),
  sessionKey: z.union([z.string(), z.null()]),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({
      newRedirect: `/login`,
      passed: false,
      status: "error",
    });

  const uid = parsed.data.uid;
  const sessionKey = parsed.data.sessionKey;

  if (generateSessionKey(uid) == sessionKey) {
    return NextResponse.json({
      newRedirect: `/${uid}?status=refresh`,
      passed: true,
      status: "success",
    });
  } else {
    return NextResponse.json({
      newRedirect: `/login/${uid}`,
      passed: false,
      status: "success",
    });
  }
}

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { execute } from "@/lib/db";
import { generateSessionKey } from "@/lib/auth";
import z from "zod";

const routeSchema = z.object({
  inputText: z.string(),
  uid: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = routeSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({
      passed: false,
      sessionKey: null,
      status: "error",
    });

  const uid = parsed.data.uid;
  const input = parsed.data.inputText;

  const [response] = await execute<{ password: string }[]>(
    "SELECT password FROM dim_profile WHERE uid=?",
    [uid]
  );

  if (input == response.password) {
    const sessionKey = generateSessionKey(uid);
    return NextResponse.json({
      passed: true,
      sessionKey: sessionKey,
      status: "sucess",
    });
  } else {
    return NextResponse.json({
      passed: false,
      sessionKey: null,
      status: "success",
    });
  }
}

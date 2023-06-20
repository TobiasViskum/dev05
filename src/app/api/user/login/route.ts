import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getProfileData } from "@/lib/db";
import z from "zod";
import { generateSessionKey } from "@/lib/auth";

const routeSchema = z.object({
  mail: z.string(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success) return NextResponse.json({ message: "error" });

  const profileData = await getProfileData(parsed.data.mail, true);

  if (profileData === null)
    return NextResponse.json({
      message: "failed",
      description: "Incorrect e-mail",
    });

  if (profileData.password !== parsed.data.password)
    return NextResponse.json({
      message: "failed",
      description: "Incorrect password",
    });

  const encryptedUid = generateSessionKey(profileData.uid);

  return NextResponse.json({
    message: "success",
    encryptedUid: encryptedUid,
    name: profileData.name,
    uid: profileData.uid,
  });
}

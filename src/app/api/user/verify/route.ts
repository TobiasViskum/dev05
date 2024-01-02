import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { generateSessionKey } from "@/lib/auth";
import z from "zod";
import { getProfileData } from "@/lib/db";

const routeSchema = z.object({
  sessionKey: z.string(),
  mail: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = routeSchema.safeParse(body);

  if (!parsed.success) return NextResponse.json({ message: "error" });

  const profileDataFromMail = await getProfileData(parsed.data.mail, true);

  if (profileDataFromMail === null) {
    return NextResponse.json({ message: "failed" });
  }

  const encryptedUid = generateSessionKey(profileDataFromMail.uid);

  if (encryptedUid === parsed.data.sessionKey) {
    return NextResponse.json({
      message: "success",
      name: profileDataFromMail.name,
      uid: profileDataFromMail.uid,
    });
  } else {
    return NextResponse.json({ message: "failed" });
  }
}

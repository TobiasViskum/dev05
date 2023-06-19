import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { updateTheme } from "@/lib/db";
export async function POST(request: NextRequest) {
  const body: { profileData: ProfileData; newTheme: "dark" | "blue" } =
    await request.json();

  if (body.newTheme === "blue" || body.newTheme === "dark") {
    await updateTheme({
      profileData: body.profileData,
      newTheme: body.newTheme,
    });

    return NextResponse.json({ status: "succes", message: "" });
  } else {
    return NextResponse.json({
      status: "error",
      message: "Themes available: Dark, Blue",
    });
  }
}

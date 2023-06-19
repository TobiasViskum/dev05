import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { updateMostVisited } from "@/lib/db/mostVisited/updateMostVisited";

export async function POST(request: NextRequest) {
  const body: { profileData: ProfileData; name_id: string } =
    await request.json();
  await updateMostVisited(body);

  return NextResponse.json({});
}

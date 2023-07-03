import { NextRequest, NextResponse } from "next/server";
import { store } from "@/store";
import {
  getProfileData,
  getAppData,
  getFitnessData,
  getCardioData,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid") as Uid | null;

  if (!uid)
    return NextResponse.json({
      profileData: {},
      appData: [],
      fitnessData: [],
    });

  const [profileData, fitnessData, cardioData] = await Promise.all([
    getProfileData(uid),
    getFitnessData(uid),
    getCardioData(uid),
  ]);

  if (!profileData)
    return NextResponse.json({
      profileData: {},
      appData: [],
      fitnessData: [],
    });

  const appData = await getAppData(profileData);

  return NextResponse.json({
    profileData: profileData,
    appData: appData,
    fitnessData: fitnessData,
    cardioData: cardioData,
  });
}

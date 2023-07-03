import { NextRequest, NextResponse } from "next/server";
import { store } from "@/store";
import {
  getProfileData,
  getAppData,
  getFitnessData,
  getCardioData,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get("uid") as Uid | null;
  const getSpecific = searchParams.get("getSpecific");

  if (!uid)
    return NextResponse.json({
      profileData: {},
      appData: [],
      fitnessData: [],
    });

  if (getSpecific) {
    if (getSpecific === "cardioData") {
      const cardioData = await getCardioData(uid);
      return NextResponse.json({ cardioData: cardioData });
    }
  }

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

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { updateFavorite } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body: {
    uid: Uid;
    newState: boolean;
    name_id: string;
    favorites: { [key: string]: string };
  } = await request.json();

  const result = await updateFavorite(body);

  return NextResponse.json({ result });
}

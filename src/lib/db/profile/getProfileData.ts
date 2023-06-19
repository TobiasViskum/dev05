import { execute } from "@/lib/db";
import { profileDataParser } from "./profileDataParser";
import { updateFromNullToObject } from "../favorites";

export async function getProfileData(uid: string) {
  const q =
    "SELECT * FROM dim_profile AS A INNER JOIN dim_profile_group AS B ON A.profile_group_id = B.id WHERE A.uid=(?)";
  const val = [uid];

  const result: ProfileDataBefore[] = await execute(q, val);
  const [profileData]: ProfileData[] = await profileDataParser(result);

  if (profileData.favorites === null && result.length > 0) {
    await updateFromNullToObject(uid);
  }

  return profileData;
}

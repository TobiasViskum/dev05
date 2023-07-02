import { execute } from "@/lib/db";
import { profileDataParser } from "./profileDataParser";
import { updateFromNullToObject } from "../favorites";
import { redirect } from "next/navigation";

export async function getProfileData(
  uid: Uid | string,
  byMail: boolean = false
) {
  let q =
    "SELECT * FROM dim_profile AS A INNER JOIN dim_profile_group AS B ON A.profile_group_id = B.id WHERE A.uid=(?)";
  if (byMail === true) {
    q =
      "SELECT * FROM dim_profile AS A INNER JOIN dim_profile_group AS B ON A.profile_group_id = B.id WHERE A.mail=(?)";
  }

  const val = [uid];

  const result: ProfileDataBefore[] = await execute(q, val);

  if (result.length === 0) redirect("/");

  const unSerializedProfileData: ProfileData[] = await profileDataParser(
    result
  );
  const serializedProfileData: ProfileData[] = JSON.parse(
    JSON.stringify(unSerializedProfileData)
  );

  const profileData = serializedProfileData[0];

  if (profileData.favorites === null && result.length > 0) {
    await updateFromNullToObject(uid, byMail);
  }

  return profileData;
}

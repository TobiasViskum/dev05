import { execute } from "../db";

interface Props {
  profileData: ProfileData;
  newTheme: string;
}

export async function updateTheme({ profileData, newTheme }: Props) {
  const q = "UPDATE dim_profile SET color_theme=? WHERE uid=?";
  const val = [newTheme, profileData.uid];
  await execute(q, val);
  return;
}

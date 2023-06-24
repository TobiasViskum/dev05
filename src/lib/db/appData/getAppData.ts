import { execute } from "@/lib/db";
import { getPath } from "./getPath";

export async function getAppData(profileData: ProfileData) {
  const q = "SELECT * FROM app_data";

  const allApps = await execute<AppData[]>(q, [""]);

  let appData: AppData[] = [];
  allApps.forEach((app) => {
    if (
      profileData.available_apps?.find((name_id) => name_id === app.name_id)
    ) {
      app.href = getPath(app.name_id, profileData);
      appData.push(app);
    }
  });

  const serializedData: AppData[] = JSON.parse(JSON.stringify(appData));

  return serializedData;
}

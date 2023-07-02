export async function profileDataParser(
  profileDataUnparsed: ProfileDataBefore[]
) {
  if (profileDataUnparsed[0].favorites != null) {
    profileDataUnparsed[0].favorites = JSON.parse(
      profileDataUnparsed[0].favorites
    );
  }
  if (profileDataUnparsed[0].most_visited != null) {
    profileDataUnparsed[0].most_visited = JSON.parse(
      profileDataUnparsed[0].most_visited
    );
  }
  if (profileDataUnparsed[0].available_apps != null) {
    profileDataUnparsed[0].available_apps = JSON.parse(
      profileDataUnparsed[0].available_apps
    );
  }
  const tempProfileData = JSON.stringify(profileDataUnparsed);
  const profileData: ProfileData[] = JSON.parse(
    JSON.stringify(profileDataUnparsed)
  );
  return profileData;
}

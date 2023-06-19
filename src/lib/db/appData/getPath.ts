function fitnessPath(initialPath: string, profileData: ProfileData) {
  if (profileData.is_reps_default === 1) {
    return [initialPath, "reps"].join("/");
  }
  return [initialPath, "max"].join("/");
}

export function getPath(name_id: string, profileData: ProfileData) {
  const initialPath = getInitialPath(name_id, profileData);

  if (name_id === "fitness") {
    return fitnessPath(initialPath, profileData);
  } else {
    return [initialPath].join("/");
  }
}

function getInitialPath(name_id: string, profileData: ProfileData) {
  const initialPath = ["", profileData.uid, name_id].join("/");

  return initialPath;
}

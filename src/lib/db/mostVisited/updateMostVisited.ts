import { execute } from "../db";

interface Props {
  profileData: ProfileData;
  name_id: string;
}

export async function updateMostVisited({ profileData, name_id }: Props) {
  const uid = profileData.uid;
  let mostVisited = profileData.most_visited;
  if (mostVisited === null) {
    const newValue = JSON.stringify({ [name_id]: 1 });
    const q = "UPDATE dim_profile SET most_visited=? WHERE uid=?";
    const val = [newValue, uid];
    await execute(q, val);
  } else {
    if (mostVisited[name_id] == null || mostVisited[name_id] == undefined) {
      mostVisited[name_id] = 1;
      const newValue = JSON.stringify(mostVisited);
      const q = "UPDATE dim_profile SET most_visited=? WHERE uid=?";
      const val = [newValue, uid];
      await execute(q, val);
    } else {
      mostVisited[name_id] = mostVisited[name_id] + 1;
      const newValue = JSON.stringify(mostVisited);
      const q = "UPDATE dim_profile SET most_visited=? WHERE uid=?";
      const val = [newValue, uid];
      await execute(q, val);
    }
  }
}

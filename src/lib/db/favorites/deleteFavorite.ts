import { execute } from "../db";

export async function deleteFavorite(
  name_id: string,
  uid: Uid,
  favorites: { [key: string]: string }
) {
  const query_2 = `UPDATE dim_profile SET favorites=? WHERE uid=?`;
  delete favorites[name_id];
  const values_2 = [JSON.stringify(favorites), uid];

  await execute(query_2, values_2);

  return favorites;
}

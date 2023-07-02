import { execute } from "../db";

export async function updateFromNullToObject(uid: Uid) {
  const query = 'UPDATE dim_profile SET favorites="{}" WHERE uid=?';
  const values = [uid];
  await execute(query, values);
}

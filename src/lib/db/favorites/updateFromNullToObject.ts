import { execute } from "../db";

export async function updateFromNullToObject(
  uid: Uid | string,
  byMail: boolean = false
) {
  const query = byMail
    ? 'UPDATE dim_profile SET favorites="{}" WHERE mail=?'
    : 'UPDATE dim_profile SET favorites="{}" WHERE uid=?';
  const values = [uid];
  await execute(query, values);
}

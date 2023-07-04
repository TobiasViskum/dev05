import { execute } from "../db";

export default async function getCardioGroupings(profileUid: Uid) {
  const query =
    'SELECT * FROM cardio_grouping WHERE profile_group_id=? OR profile_group_id="all"';
  const values = [profileUid];

  const result = await execute<CardioGroupings[]>(query, values);
  const groupings: CardioGroupings[] = JSON.parse(JSON.stringify(result));

  return groupings;
}

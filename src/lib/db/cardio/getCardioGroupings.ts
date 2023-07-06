import { execute } from "../db";

export default async function getCardioGroupings(
  profileUid: Uid,
  discipline_id: number
) {
  const query =
    'SELECT * FROM cardio_grouping WHERE (profile_group_uid=? OR profile_group_uid="all") AND (discipline_id=? OR discipline_id=1)';
  const values = [profileUid, discipline_id];

  const result = await execute<CardioGroupings[]>(query, values);
  const groupings: CardioGroupings[] = JSON.parse(JSON.stringify(result));

  return groupings;
}

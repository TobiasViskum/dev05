import { execute } from "../db";

export default async function updateSettings({
  id,
  profileGroupUid,
  disciplineId,
  newName,
  newGroup,
  newUnit,
}: {
  id: number;
  profileGroupUid: string;
  disciplineId: number;
  newName: string;
  newGroup: string;
  newUnit: string;
}) {
  let unitId = -1;
  let groupId = -1;
  const getGroup = execute<{ group_id: number }[]>(
    "SELECT group_id FROM cardio_grouping WHERE group_name=?",
    [newGroup]
  );
  const getUnit = execute<{ unit_id: number }[]>(
    "SELECT unit_id FROM cardio_units WHERE unit_name=?",
    [newUnit]
  );

  const [groupResult, [unitResult]] = await Promise.all([getGroup, getUnit]);

  unitId = unitResult.unit_id;

  if (groupResult.length === 0) {
    const res = await execute<UpdateResponse>(
      "INSERT INTO cardio_grouping (group_name, group_sort_order, profile_group_uid, discipline_id) VALUES(?, 3, ?, ?)",
      [newGroup, profileGroupUid, disciplineId]
    );
    groupId = res.insertId;
  } else {
    groupId = groupResult[0].group_id;
  }

  const q =
    "UPDATE cardio_stat_table SET name=?, group_id=?, unit_id=? WHERE id=?";
  const val = [newName, groupId, unitId, id];

  await execute(q, val);

  return;
}

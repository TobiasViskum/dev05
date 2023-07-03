import { execute } from "../db";

export async function updateDistanceUnitTime({
  id,
  newDistance,
  newUnit,
  newTime: { hours, minutes, seconds },
}: {
  id: number;
  newDistance: number;
  newUnit: string;
  newTime: { hours: number; minutes: number; seconds: number };
}) {
  const getUnitIdQuery = "SELECT unit_id FROM cardio_units WHERE unit_name=?";
  const getUnitIdValues = [newUnit];

  const [newUnitId] = await execute<{ unit_id: number }[]>(
    getUnitIdQuery,
    getUnitIdValues
  );

  const query =
    'UPDATE cardio_stat_table SET distance=?, unit_id=?, time_amount=JSON_OBJECT("hours", ?, "minutes", ?, "seconds", ?) WHERE id=?';
  const values = [newDistance, newUnitId.unit_id, hours, minutes, seconds, id];
  await execute(query, values);
  return;
}

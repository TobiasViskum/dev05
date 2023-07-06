import { execute } from "../db";

interface Props {
  id: number;
  uid: string;
}

export default async function deleteExercise({ id, uid }: Props) {
  const query = "DELETE FROM cardio_stat_table WHERE id=? AND uid=?";
  const values = [id, uid];
  await execute(query, values);

  return;
}

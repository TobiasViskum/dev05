import { execute } from "../db";

interface Props {
  uid: string;
  name: string;
  discipline: string;
}

export default async function createExercise({ uid, name, discipline }: Props) {
  const getDisciplineIdQuery =
    "SELECT discipline_id FROM cardio_disciplines WHERE discipline_name=?";
  const getDisciplineIdValues = [discipline];
  const [discipline_id] = await execute<{ discipline_id: number }[]>(
    getDisciplineIdQuery,
    getDisciplineIdValues
  );

  const q =
    "INSERT INTO cardio_stat_table (uid, name, discipline_id) VALUES(?, ?, ?)";
  const val = [uid, name, discipline_id.discipline_id];
  await execute(q, val);
  return;
}

import { execute } from "../db";

interface Props {
  id: number;
  newState: number;
}

export default async function updateLock({ id, newState }: Props) {
  const q = "UPDATE fitness_stat_table SET is_date_locked=? WHERE id=?";
  const val = [newState, id];
  await execute(q, val);
  return;
}

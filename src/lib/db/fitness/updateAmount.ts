import { execute } from "../db";

interface Props {
  id: number;
  newAmount: number;
  type: "reps" | "max";
}

export default async function updateAmount({ id, newAmount, type }: Props) {
  const q = `UPDATE fitness_stat_table SET ${type}=? WHERE id=?`;
  const val = [newAmount, id];
  await execute(q, val);
  return;
}

import { execute } from "../db";

interface Props {
  id: number;
  newUnit: string;
}

export default async function updateUnit({ id, newUnit }: Props) {
  const q_unit = "SELECT unit_id FROM dim_units WHERE unit_name=?";
  const val_unit = [newUnit];
  const unit_id = (await execute<{ unit_id: number }[]>(q_unit, val_unit))[0]
    .unit_id;

  const q_fitness = "UPDATE fitness_stat_table SET unit_id=? WHERE id=?";
  const val_fitness = [unit_id, id];
  await execute(q_fitness, val_fitness);
  return;
}

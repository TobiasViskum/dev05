import { execute } from "../db";

export async function getFitnessData(uid: string) {
  const q =
    "SELECT A.*, F.show_vas_fitness, C.unit_name, B.group_name AS group_name_max, D.group_name AS group_name_reps, E.reps_range_name FROM fitness_stat_table A LEFT JOIN dim_grouping B ON A.group_id_max = B.group_id LEFT JOIN dim_grouping D ON A.group_id_reps = D.group_id INNER JOIN dim_units C ON A.unit_id = C.unit_id INNER JOIN dim_reps_range AS E ON A.reps_range_id = E.reps_range_id INNER JOIN dim_profile AS F ON A.uid = F.uid WHERE A.uid =(?)";
  const val = [uid];

  const fitnessData: FitnessData[] = await execute(q, val);

  return fitnessData;
}

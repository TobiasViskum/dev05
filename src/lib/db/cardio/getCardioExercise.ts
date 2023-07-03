import { execute } from "../db";

export default async function getCardioExercise(id: string) {
  const query = "SELECT * FROM cardio_stat_table WHERE id=?";
  const values = [id];
  const [exerciseData] = await execute<CardioDataUnparsed[]>(query, values);
  exerciseData.time_amount = JSON.parse(exerciseData.time_amount);
  const serializedData: CardioDataUnparsed = JSON.parse(
    JSON.stringify(exerciseData)
  );

  return serializedData;
}

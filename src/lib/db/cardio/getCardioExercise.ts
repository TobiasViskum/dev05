import { execute } from "../db";
import { cardioQuery } from "./cardioQuery";

export default async function getCardioExercise(id: string) {
  const query = `${cardioQuery} WHERE id=?`;
  const values = [id];
  const [exerciseData] = await execute<CardioDataUnparsed[]>(query, values);
  exerciseData.time_amount = JSON.parse(exerciseData.time_amount);
  const serializedData: CardioDataUnparsed = JSON.parse(
    JSON.stringify(exerciseData)
  );

  return serializedData;
}

import { execute } from "../db";

export default async function getCardioUnits() {
  const query = "SELECT * FROM cardio_units";
  const values = [""];

  const result = await execute<CardioUnits[]>(query, values);
  const cardioUnits: CardioUnits[] = JSON.parse(JSON.stringify(result));

  return cardioUnits;
}

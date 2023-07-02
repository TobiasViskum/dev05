import { execute } from "../db";
import { cardioDataParser } from "./cardioDataParser";

export async function getCardioData(uid: Uid) {
  const query =
    "SELECT * FROM cardio_stat_table AS a LEFT JOIN cardio_grouping AS b ON a.group_id=b.group_id LEFT JOIN cardio_disciplines AS c ON a.discipline_id=c.discipline_id WHERE a.uid=?";
  const values = [uid];

  const result = await execute<CardioData[]>(query, values);

  const serializedCardioData: CardioDataUnparsed[] = JSON.parse(
    JSON.stringify(result)
  );

  const cardioData = cardioDataParser(serializedCardioData);

  return cardioData;
}

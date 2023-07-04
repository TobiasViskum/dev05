import { execute } from "../db";
import { cardioDataParser } from "./cardioDataParser";
import { cardioQuery } from "./cardioQuery";

export async function getCardioData(uid: Uid) {
  const query = `${cardioQuery} WHERE a.uid=?`;
  const values = [uid];

  const result = await execute<CardioData[]>(query, values);

  const serializedCardioData: CardioDataUnparsed[] = JSON.parse(
    JSON.stringify(result)
  );

  const cardioData = cardioDataParser(serializedCardioData);

  return cardioData;
}

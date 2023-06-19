import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: "192.168.2.35",
    database: "fitness_db",
    user: "tobias",
    password: "fitness",
  },
});

export async function execute<ReceivedType>(q: string, val: any[]): Promise<ReceivedType> {
  if (q == undefined || val[0] == undefined) return ["failed"] as ReceivedType;

  try {
    const results = await db.query(q, val);
    await db.end();
    return results as ReceivedType;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

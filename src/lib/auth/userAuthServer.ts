import { execute } from "@/lib/db";
import { redirect } from "next/navigation";

export async function userAuthServer(uid: Uid) {
  if (uid == undefined) redirect("/");

  const q = "SELECT * FROM dim_profile WHERE uid=(?)";
  const val = [uid];

  const result = await execute<ProfilesNoJoin[]>(q, val);

  if (result.length == 0) {
    redirect(`/`);
  }

  return result;
}

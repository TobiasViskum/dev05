import { execute } from "@/lib/db";
import { redirect } from "next/navigation";

export async function userAuthServer(uid: string) {
  if (uid == undefined) redirect("/login");

  const q = "SELECT * FROM dim_profile WHERE uid=(?)";
  const val = [uid];

  const result = await execute<ProfilesNoJoin[]>(q, val);

  if (result.length == 0) {
    redirect(`/login`);
  }

  return result;
}

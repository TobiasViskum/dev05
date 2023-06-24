import { userAuthServer, UserAuthClient } from "@/lib/auth";
import { getProfileData, getAppData, getFitnessData } from "@/lib/db";
import { store } from "@/store";
import {
  setProfileData,
  setAppData,
  setFitnessData,
} from "@/store/userDataSlice";
import { redirect } from "next/navigation";
import { Providers, SetReduxStore } from "@/components/Redux";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uid: string };
}) {
  const uid = params.uid;
  const [profileData, fitnessData] = await Promise.all([
    getProfileData(uid),
    getFitnessData(uid),
  ]);
  if (profileData === null) redirect("/");
  const appData = await getAppData(profileData);

  store.dispatch(setProfileData(profileData));
  store.dispatch(setAppData(appData));
  store.dispatch(setFitnessData(fitnessData));

  await userAuthServer(uid);

  return (
    <>
      <Providers>
        <SetReduxStore uid={uid} />
        <UserAuthClient uid={uid} />
        {children}
      </Providers>
    </>
  );
}

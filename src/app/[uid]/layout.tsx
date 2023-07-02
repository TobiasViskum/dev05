import { userAuthServer, UserAuthClient } from "@/lib/auth";
import { Providers, SetReduxStore } from "@/components/Redux";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uid: Uid };
}) {
  const uid = params.uid;

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

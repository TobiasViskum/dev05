import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Fitness | Profiles",
  },
};

export default async function ProfilesPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <>
      <h1>page</h1>
      <Link href={`/${uid}`}>Go back</Link>
    </>
  );
}

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog",
};

export default async function page({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <>
      <h1>page</h1>
      <Link href={`/${uid}`}>Go back</Link>
    </>
  );
}

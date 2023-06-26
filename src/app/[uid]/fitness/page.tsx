import Link from "next/link";
import { Metadata } from "next";
import ModalText from "./ModalTest";

export const metadata: Metadata = {
  title: "Fitness",
};

export default async function SearchPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <>
      <ModalText />
      <h1>page</h1>
      <Link href={`/${uid}`}>Go back</Link>
    </>
  );
}

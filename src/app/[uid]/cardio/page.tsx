import Link from "next/link";

export default async function page({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <>
      <h1>page</h1>
      <Link href={`/${uid}`}>Go back</Link>
    </>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Fitness | Search",
  },
};

export default async function MaxPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-4xl">Søg efter øvelse</h1>
      <div></div>
    </div>
  );
}

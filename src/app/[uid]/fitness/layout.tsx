import { FitnessOverlay } from "@/components/page-fitness";

export default async function FitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FitnessOverlay />
      {children}
    </>
  );
}

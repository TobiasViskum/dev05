import { FitnessOverlay } from "@/components/page-fitness";

export default async function FitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FitnessOverlay />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">{children}</div>
      </div>
    </>
  );
}

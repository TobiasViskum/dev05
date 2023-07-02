import { CardioOverlay } from "@/components/page-cardio";

export default async function FitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CardioOverlay />
      <div className="flex w-full justify-center">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </>
  );
}

import { FitnessOverlay } from "@/components/page-fitness";

export default async function FitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FitnessOverlay />
      <div className="w-[calc(100svw_-_32px)] flex justify-center">
        <div className="max-w-4xl w-full mr-4">{children}</div>
      </div>
    </>
  );
}

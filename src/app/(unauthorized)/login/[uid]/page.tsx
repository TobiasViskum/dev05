import { SubmitConfirm } from "./SubmitConfirm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification",
};

export default function page({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <main className="grid w-full place-items-center gap-x-4 text-center">
      <h1 className="mb-4 mt-12 text-4xl font-bold">Verification</h1>
      <p className="text-second">
        It seems to be a long time since you last logged in...
      </p>
      <p className="pt-4 text-second">
        Please confirm it{"'"}s you by providing your password:
      </p>
      <SubmitConfirm uid={uid} />
    </main>
  );
}

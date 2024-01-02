"use client";

import { dog } from "@/assets/images";
import ContentItem from "./ContentItem";
import { useParams } from "next/navigation";

export default function DogContent({ currTab }: { currTab: string[] }) {
  const params = useParams();
  const uid = params.uid;

  return (
    <>
      <ContentItem destPath={`/${uid}/dog`} image={dog} text="Hund" imageSize="h-full w-full" />
    </>
  );
}

"use client";

import { dog } from "@/assets/images";
import ContentItem from "./ContentItem";

export default function DogContent({ currTab }: { currTab: string[] }) {
  return (
    <>
      <ContentItem destPath={`/dog`} image={dog} text="Hund" imageSize="h-3/4 w-3/4" />
    </>
  );
}

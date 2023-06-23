"use client";

import { info, key } from "@/assets/images";
import ContentItem from "./ContentItem";

export default function StartContent() {
  return (
    <>
      <ContentItem
        destPath={`/`}
        image={info}
        text="Info"
        imageSize="h-5/6 w-5/6"
      />
      <ContentItem
        destPath={`/login`}
        image={key}
        text="Login"
        imageSize="h-3/4 w-3/4"
      />
    </>
  );
}

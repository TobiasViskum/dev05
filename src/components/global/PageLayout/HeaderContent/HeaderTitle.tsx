import { firstLetterUppercase } from "@/lib/util";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  isHeaderTitleActive: boolean;
  title: string;
}

export default function HeaderTitle({ isHeaderTitleActive, title }: Props) {
  const path = usePathname();

  return (
    <>
      <p
        className={twMerge(
          "font-semibold transition-opacity duration-300",
          isHeaderTitleActive ? "opacity-100" : "opacity-0",
          path.split("/").length > 2 ? "visible" : "invisible duration-0"
        )}
      >
        {title !== "start" ? firstLetterUppercase(title) : ""}
      </p>
    </>
  );
}

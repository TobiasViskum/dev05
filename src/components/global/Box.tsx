import { twJoin } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";

interface BoxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  profileData: ProfileData | null;
}

export default function Box({
  className,
  children,
  profileData,
  ...props
}: BoxProps) {
  return (
    <>
      <div
        className={twJoin(
          className,
          "rounded-md",
          isTheme("blue", profileData)
            ? "bg-second"
            : "border border-solid border-inactive bg-first"
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

import { createContext } from "react";

const mainClass = "bg-white text-black text-center py-3 rounded-lg";

export const DatePickerContext = createContext({
  classes: {},
  action: "",
  currDate: { year: 0, month: 0 },
});

export default function ContextProvider({
  children,
  classes,
  action,
  currDate,
}: {
  children: React.ReactNode;
  classes: {};
  action: "forwards" | "backwards" | "";
  currDate: { year: number; month: number };
}) {
  return (
    <DatePickerContext.Provider
      value={{ classes: classes, action: action, currDate: currDate }}
    >
      {children}
    </DatePickerContext.Provider>
  );
}

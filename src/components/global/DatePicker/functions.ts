export function compareDates(date1: Date | null, date2: Date | null) {
  if (date1 && date2) {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    }
    return false;
  }
  return false;
}

export function getFutureDate(
  type: "year" | "month",
  action: "backwards" | "forwards",
  currDate: { year: number; month: number }
) {
  if (action === "backwards") {
    if (type === "year") {
      return currDate.month === 0 ? currDate.year - 1 : currDate.year;
    } else if (type === "month") {
      return currDate.month === 0 ? 11 : currDate.month - 1;
    }
  } else if (action === "forwards") {
    if (type === "year") {
      return currDate.month === 11 ? currDate.year + 1 : currDate.year;
    } else if (type === "month") {
      return currDate.month === 11 ? 0 : currDate.month + 1;
    }
  }
  return 0;
}

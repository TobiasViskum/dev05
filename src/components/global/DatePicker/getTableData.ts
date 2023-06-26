import prototypes from "@/prototypes";
prototypes();

function getAllDaysInMonth() {
  const today = new Date();
  const currYear = today.getFullYear();
  const currMonth = today.getMonth();

  const date = new Date(currYear, currMonth, 1);
  const dates = [];

  while (date.getMonth() === currMonth) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

export default function getTableData() {
  const emptyWeekObject: { [key: number]: number | null } = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
  };

  const tableData = [
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
  ];

  const datesInCurrMonth = getAllDaysInMonth();

  let weekCount = 0;
  const startWeek = datesInCurrMonth[0].getWeek();

  datesInCurrMonth.forEach((item, index) => {
    if (item.getWeek() - startWeek !== weekCount) {
      weekCount += 1;
    }

    const day = (item.getDay() - 1 < 0 ? 6 : item.getDay() - 1) + 1;
    tableData[weekCount][day] = item.getDate();
  });

  return tableData;
}

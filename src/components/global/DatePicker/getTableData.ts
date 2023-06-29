import prototypes from "@/prototypes";
prototypes();

function getAllDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

export default function getTableData(year: number, month: number) {
  const emptyWeekObject: { [key: number]: number } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  const tableData = [
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
    structuredClone(emptyWeekObject),
  ];

  const datesInPrevMonth = getAllDaysInMonth(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1
  );
  const datesInCurrMonth = getAllDaysInMonth(year, month);

  const datesInNextMonth = getAllDaysInMonth(
    month === 11 ? year + 1 : year,
    month === 11 ? 0 : month + 1
  );

  let weekCount = 0;
  const startWeek = datesInCurrMonth[0].getWeek();

  function adjustWeek(date: Date) {
    if (date.getWeek() < startWeek) return date.getWeek() + startWeek;

    return date.getWeek();
  }

  datesInCurrMonth.forEach((item, index) => {
    if (adjustWeek(item) - startWeek !== weekCount) {
      if (
        item.getMonth() === 11 &&
        (item.getDate() === 30 || item.getDate() === 31)
      ) {
        if (
          adjustWeek(item) !== adjustWeek(item) - startWeek &&
          weekCount <= 4
        ) {
          weekCount += 1;
        }
      } else {
        weekCount += 1;
      }
    }

    const day = item.getDay() - 1 < 0 ? 6 : item.getDay() - 1;

    try {
      tableData[weekCount][day] = item.getDate();
    } catch (err) {
      console.log("error");
    }
  });

  return tableData;
}

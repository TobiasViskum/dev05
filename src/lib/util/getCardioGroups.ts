function getTimeInSecond(timeAmount: TimeAmount) {
  if (!timeAmount) return 0;
  const hours = timeAmount.hours ? timeAmount.hours : 0;
  const minutes = timeAmount.minutes ? timeAmount.minutes : 0;
  const seconds = timeAmount.seconds ? timeAmount.seconds : 0;

  return seconds + minutes * 60 + hours * 3600;
}

export function getCardioGroups(
  cardioData: CardioData[],
  discipline: "cycling" | "running" | "swimming"
) {
  let cardioGroupList: {
    groupData: { name: string; id: number };
    exercisesInGroup: CardioData[];
  }[] = [];
  let insertedGroups: { [key: string]: string } = {};
  let sortedData = cardioData.sort(
    (a, b) =>
      a.group_id! - b.group_id! ||
      getTimeInSecond(a.time_amount) - getTimeInSecond(b.time_amount)
  );

  function validateDiscipline(cardioExercise: CardioData) {
    return (
      cardioExercise.discipline_name.toLowerCase() === discipline.toLowerCase()
    );
  }

  function getItemsInGroup(group: string) {
    let exercisesInGroup: CardioData[] = [];
    sortedData.map((item) => {
      if (validateDiscipline(item) && item.group_name === group) {
        exercisesInGroup.push(item);
      }
    });
    return exercisesInGroup;
  }

  sortedData.map((groupChecker) => {
    const groupId = groupChecker.group_id;
    const groupName = groupChecker.group_name;

    if (
      validateDiscipline(groupChecker) &&
      insertedGroups[groupName] == undefined
    ) {
      insertedGroups[groupName] = groupName;
      const exercisesInGroup = getItemsInGroup(groupName);

      cardioGroupList.push({
        groupData: { name: groupName, id: groupId },
        exercisesInGroup: exercisesInGroup,
      });
    }
  });
  return cardioGroupList;
}

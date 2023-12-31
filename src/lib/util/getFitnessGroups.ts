const nameIfNoGroup = "Ungrouped";

export function getFitnessGroups(fitnessData: FitnessData[], type: "max" | "reps") {
  const UNIT_CONVERTER = 2.20462262;
  let fitnessGroupList: {
    groupData: { name: string; id: number };
    exercisesInGroup: FitnessData[];
  }[] = [];
  let insertedGroups: { [key: string]: string } = {};
  let sortedData = fitnessData.sort(
    (a, b) =>
      a[`group_id_${type}`]! - b[`group_id_${type}`]! ||
      (b.unit_name === "lbs" ? b[`${type}`] / UNIT_CONVERTER : b[`${type}`]) -
        (a.unit_name === "lbs" ? a[`${type}`] / UNIT_CONVERTER : a[`${type}`])
  );

  function getItemsInGroup(group: string) {
    let exercisesInGroup: FitnessData[] = [];
    sortedData.map((item) => {
      const itemGroup =
        item[`group_name_${type}`] === null ? nameIfNoGroup : item[`group_name_${type}`];
      if (itemGroup === group && item[`has_${type}`] === 1) {
        exercisesInGroup.push(item);
      }
    });
    return exercisesInGroup;
  }

  sortedData.map((groupChecker, index) => {
    const groupId =
      groupChecker[`group_id_${type}`] === null ? null : groupChecker[`group_id_${type}`];
    const groupName =
      groupChecker[`group_name_${type}`] === null
        ? nameIfNoGroup
        : groupChecker[`group_name_${type}`];

    if (groupChecker[`has_${type}`] === 1 && groupName && groupId) {
      if (insertedGroups[groupName] == undefined) {
        insertedGroups[groupName] = groupName;
        const exercisesInGroup = getItemsInGroup(groupName);

        fitnessGroupList.push({
          groupData: { name: groupName, id: groupId },
          exercisesInGroup: exercisesInGroup,
        });
      }
    }
  });

  return fitnessGroupList;
}

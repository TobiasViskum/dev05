export function findMostViewed(profileData: ProfileData, appData: AppData[]) {
  const mostVisited = profileData.most_visited;
  let result: any = [];
  if (mostVisited) {
    const entries = Object.entries(mostVisited);
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
    const topThreeEntries = sortedEntries.slice(0, 3);
    result = topThreeEntries.map((entry) => ({ [entry[0]]: entry[1] }));
  }
  let count = 0;
  let maxRetries = 10;
  while (result.length < 3 && count < maxRetries) {
    count += 1;
    const randomIndex = Math.floor(Math.random() * appData.length);
    const randomObject = appData[randomIndex];
    const newObj = { [randomObject.name_id]: 0 };

    if (
      !result.some((obj: any) =>
        Object.keys(obj).some((key) => key === Object.keys(newObj)[0])
      )
    ) {
      result.push(newObj);
    }
    if (count >= maxRetries) {
      break;
    }
  }
  return result;
}

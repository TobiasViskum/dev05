const parse: { [key: string]: { [key: string]: string } } = {
  "reps": {
    "amount": "reps",
    "date": "updated_date_reps",
    "vas": "vas_reps",
    "notes": "notes_reps",
    "group": "",
  },
  "max": {
    "amount": "reps",
    "date": "updated_date_max",
    "vas": "vas_max",
    "notes": "notes_max",
  },
};

export function getFitnessColumnName(keywords: ["reps" | "max", string]) {
  const exerciseType = keywords[0];
  const command = keywords[1];

  return parse[exerciseType][command];
}

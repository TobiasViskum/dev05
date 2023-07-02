type Overlay = "" | "editAmount" | "createExercise" | "loading" | "animation";

type Uid = `${`${string}-${string}-${string}-${string}-${string}` & {
  length: 36;
}}`;

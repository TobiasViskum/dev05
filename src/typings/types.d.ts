type Overlay =
  | ""
  | "editAmount"
  | "createExercise"
  | "loading"
  | "animation"
  | "deleteExercise";

type Uid = `${`${string}-${string}-${string}-${string}-${string}` & {
  length: 36;
}}`;

import { Content } from "@/components/page-cardio/CardioSettings";
import { getCardioExercise } from "@/lib/db/cardio";

export default async function page({ params }: ExtendedViskumAppParams) {
  const uid = params.uid;
  const exerciseId = params.exerciseId;

  const exerciseData = await getCardioExercise(exerciseId);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <h1 className="mt-2 text-center text-lg [text-wrap:_balance] tn:text-2xl">
        {exerciseData.name}
      </h1>
      <div className="mb-6 h-2 w-48 border-b border-inactive" />
      <div className="flex w-full flex-col items-center gap-y-4 px-4">
        <Content />
      </div>
    </div>
  );
}

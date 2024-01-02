import {
  Content,
  Delete,
  EditGroup,
  EditIsSprint,
  EditName,
  EditUnit,
  Save,
} from "@/components/page-cardio/CardioSettings";
import { getCardioExercise } from "@/lib/db/cardio";
import { Metadata, ResolvingMetadata } from "next";
import { twJoin } from "tailwind-merge";

export default async function page({ params }: ExtendedViskumAppParams) {
  const uid = params.uid;
  const exerciseId = params.exerciseId;

  const exerciseData = await getCardioExercise(exerciseId);

  return (
    <div className="flex w-full xl:max-w-2xl flex-col items-center">
      <h1 className="mt-2 text-center text-lg [text-wrap:_balance] tn:text-2xl">
        {exerciseData.name}
      </h1>
      <div className="mb-6 h-2 w-48 border-b border-inactive" />
      <div className="flex h-full w-full flex-col items-center gap-y-4 px-4">
        <Content>
          <div className="flex w-full max-w-2xl items-center justify-center">
            <EditName />
          </div>
          <div className="flex w-full max-w-2xl items-center justify-center">
            {/* <EditIsSprint /> */}
          </div>
          <div
            className={twJoin(
              "flex w-full max-w-2xl flex-col items-center justify-center gap-x-4 gap-y-6 tn:flex-row tn:gap-y-0"
            )}
          >
            <div className="flex w-3/5 flex-col items-center gap-y-2 text-center">
              <EditGroup />
            </div>
            <div className="flex w-2/5 flex-col items-center gap-y-2 text-center">
              <EditUnit />
            </div>
          </div>
          <Delete />
          <Save />
        </Content>
      </div>
    </div>
  );
}

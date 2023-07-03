"use client";

import { useAppDispatch } from "@/store/useClient";
import { useEffect } from "react";
import {
  setProfileData,
  setAppData,
  setFitnessData,
  setCardioData,
} from "@/store/userDataSlice";

interface ReduxData {
  profileData: ProfileData;
  appData: AppData[];
  fitnessData: FitnessData[];
  cardioData: CardioData[];
}

export default function SetReduxStore({ uid }: { uid: Uid }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      const result: Response = await fetch(`/api/redux-store?uid=${uid}`, {
        method: "GET",
      });
      const data: ReduxData = await result.json();
      dispatch(setProfileData(data.profileData));
      dispatch(setAppData(data.appData));
      dispatch(setFitnessData(data.fitnessData));
      dispatch(setCardioData(data.cardioData));
    }
    getData();
  }, [uid, dispatch]);

  return null;
}

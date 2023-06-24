"use client";

import { useAppDispatch } from "@/store/useClient";
import { useEffect } from "react";
import {
  setProfileData,
  setAppData,
  setFitnessData,
} from "@/store/userDataSlice";

interface ReduxData {
  profileData: ProfileData;
  appData: AppData[];
  fitnessData: FitnessData[];
}

export default function SetReduxStore({ uid }: { uid: string }) {
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
    }
    getData();
  }, [uid, dispatch]);

  return null;
}

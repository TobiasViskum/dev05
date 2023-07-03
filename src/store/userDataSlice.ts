import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  profileData: ProfileData;
  appData: AppData[];
  fitnessData: FitnessData[];
  cardioData: CardioData[];
}

const initialState: InitialState = {
  profileData: {} as ProfileData,
  appData: [],
  fitnessData: [],
  cardioData: [],
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      state.profileData = action.payload;
    },
    setAppData: (state, action: PayloadAction<AppData[]>) => {
      state.appData = action.payload;
    },
    setFitnessData: (state, action: PayloadAction<FitnessData[]>) => {
      state.fitnessData = action.payload;
    },
    setCardioData: (state, action: PayloadAction<CardioData[]>) => {
      state.cardioData = action.payload;
    },
  },
});

export const { setProfileData, setAppData, setFitnessData, setCardioData } =
  userDataSlice.actions;
export default userDataSlice.reducer;

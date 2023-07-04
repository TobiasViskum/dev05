import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  fitnessExercise: FitnessData;
  cardioExercise: CardioData;
  cardioGroupings: CardioGroupings[];
}

const initialState: InitialState = {
  fitnessExercise: {} as FitnessData,
  cardioExercise: {} as CardioData,
  cardioGroupings: [],
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setFitnessExercise: (state, action: PayloadAction<FitnessData>) => {
      state.fitnessExercise = action.payload;
    },
    setCardioExercise: (state, action: PayloadAction<CardioData>) => {
      state.cardioExercise = action.payload;
    },
    setCardioGroupings: (state, action: PayloadAction<CardioGroupings[]>) => {
      state.cardioGroupings = action.payload;
    },
  },
});

export const { setFitnessExercise, setCardioExercise, setCardioGroupings } =
  appStateSlice.actions;
export default appStateSlice.reducer;

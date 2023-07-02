import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  fitnessExercise: FitnessData;
  cardioExercise: CardioData;
}

const initialState: InitialState = {
  fitnessExercise: {} as FitnessData,
  cardioExercise: {} as CardioData,
};

const exerciseStateSlice = createSlice({
  name: "exerciseState",
  initialState,
  reducers: {
    setFitnessExercise: (state, action: PayloadAction<FitnessData>) => {
      state.fitnessExercise = action.payload;
    },
    setCardioExercise: (state, action: PayloadAction<CardioData>) => {
      state.cardioExercise = action.payload;
    },
  },
});

export const { setFitnessExercise, setCardioExercise } =
  exerciseStateSlice.actions;
export default exerciseStateSlice.reducer;

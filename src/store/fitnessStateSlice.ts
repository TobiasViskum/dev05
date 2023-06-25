import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  exerciseData: FitnessData;
}

const initialState: InitialState = {
  exerciseData: {} as FitnessData,
};

const fitnessStateSlice = createSlice({
  name: "fitnessState",
  initialState,
  reducers: {
    setExerciseData: (state, action: PayloadAction<FitnessData>) => {
      state.exerciseData = action.payload;
    },
  },
});

export const { setExerciseData } = fitnessStateSlice.actions;
export default fitnessStateSlice.reducer;

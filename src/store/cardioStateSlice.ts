import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  exerciseData: CardioData;
}

const initialState: InitialState = {
  exerciseData: {} as CardioData,
};

const cardioStateSlice = createSlice({
  name: "cardioState",
  initialState,
  reducers: {
    setCardioExerciseData: (state, action: PayloadAction<CardioData>) => {
      state.exerciseData = action.payload;
    },
  },
});

export const { setCardioExerciseData } = cardioStateSlice.actions;
export default cardioStateSlice.reducer;

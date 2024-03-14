import { OmicState } from "../../types/omic";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: OmicState = {
  loading: false,
  loadingAction: false,
  omicList: [],
  omicAnalysis: { gene: "", mean: 0, median: 0, mode: 0 },
  error: "",
};

const omicSlice = createSlice({
  name: "omic",
  initialState,
  reducers: {
    getOmicListStart: (state, action: PayloadAction<{ geneList: string }>) => {
      state.loading = true;
      state.omicList = [];
      state.error = "";
    },
    getOmicListSuccess: (state, action: PayloadAction<any>) => {
      state.omicList = action?.payload;
      state.loading = false;
      state.error = "";
    },
    getOmicListFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.omicList = [];
    },
    getOmicAnalysisStart: (state, action: PayloadAction<{ id: string }>) => {
      state.loadingAction = true;
      state.error = "";
      state.omicAnalysis = { gene: "", mean: 0, median: 0, mode: 0 };
    },
    getOmicAnalysisSuccess: (state, action: PayloadAction<any>) => {
      state.omicAnalysis = action?.payload;
      state.loadingAction = false;
      state.error = "";
    },
    getOmicAnalysisFailure: (state, action: PayloadAction<any>) => {
      state.loadingAction = false;
      state.error = action?.payload?.message;
    },
  },
});

export const {
  getOmicListStart,
  getOmicListSuccess,
  getOmicListFailure,
  getOmicAnalysisStart,
  getOmicAnalysisSuccess,
  getOmicAnalysisFailure,
} = omicSlice.actions;

export default omicSlice.reducer;

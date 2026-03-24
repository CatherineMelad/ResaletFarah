import { WhoWeAre, WhoWeAreState } from "@/lib/types/who-we-are.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Async Thunk */
export const fetchWhoWeAre = createAsyncThunk<
  WhoWeAre[],
  void,
  { rejectValue: string }
>("whoWeAre/fetchWhoWeAre", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/who-we-are");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json = await res.json();
    return json.data as WhoWeAre[];
  } catch {
    return rejectWithValue("Failed to load who we are section");
  }
});

/* Initial State */
const initialState: WhoWeAreState = {
  data: [],
  loading: false,
  error: null,
};

/* Slice */
const whoWeAreSlice = createSlice({
  name: "whoWeAre",
  initialState,
  reducers: {
    clearWhoWeAre(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWhoWeAre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWhoWeAre.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWhoWeAre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* Exports */
export const { clearWhoWeAre } = whoWeAreSlice.actions;
export const whoWeAreReducer = whoWeAreSlice.reducer;

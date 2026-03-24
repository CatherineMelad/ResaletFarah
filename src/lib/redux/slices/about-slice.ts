import { About, AboutState } from "@/lib/types/about.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* ----------------------------------
 * Async Thunk
 * ---------------------------------- */
export const fetchAbout = createAsyncThunk<
  About[],
  void,
  { rejectValue: string }
>("about/fetchAbout", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/about");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json = await res.json();
    return json.data as About[];
  } catch {
    return rejectWithValue("Failed to load about section");
  }
});

/* ----------------------------------
 * Initial State
 * ---------------------------------- */
const initialState: AboutState = {
  data: [],
  loading: false,
  error: null,
};

/* ----------------------------------
 * Slice
 * ---------------------------------- */
const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    clearAbout(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* ----------------------------------
 * Exports
 * ---------------------------------- */
export const { clearAbout } = aboutSlice.actions;
export const aboutReducer = aboutSlice.reducer;

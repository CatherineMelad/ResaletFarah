import { StoriesState, Story } from "@/lib/types/stories";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Async Thunk */
export const fetchStories = createAsyncThunk<
  Story[],
  void,
  { rejectValue: string }
>("stories/fetchStories", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/stories");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json = await res.json();
    return json.data as Story[];
  } catch {
    return rejectWithValue("Failed to load success stories");
  }
});

/* Initial State */
const initialState: StoriesState = {
  data: [],
  loading: false,
  error: null,
};

/* Slice */
const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    clearStories(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* Exports */
export const { clearStories } = storiesSlice.actions;
export const storiesReducer = storiesSlice.reducer;

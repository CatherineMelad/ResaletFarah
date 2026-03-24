import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Director,
  DirectorState,
  DirectorApi,
} from "../../types/director.types";

/* ----------------------------------
 * Mapper (API → Domain)
 * ---------------------------------- */
const mapDirectorsFromApi = (item: DirectorApi): Director => ({
  id: item.id,
  name: item.name,
  position: item.position,
  description:item.description,
  image: item.image_path,
  email: item.email,
  phone: item.phone,
});

/* Async Thunk */
export const fetchDirectors = createAsyncThunk<
  Director[],
  void,
  { rejectValue: string }
>("director/fetchDirectors", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/directors");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json: { data: DirectorApi[] } = await res.json();

    // ✅ Normalize + type-safe
    return json.data.map(mapDirectorsFromApi);
  } catch {
    return rejectWithValue("Failed to load director");
  }
});

/* Initial State */
const initialState: DirectorState = {
  data: [],
  loading: false,
  error: null,
};

/* Slice */
const directorSlice = createSlice({
  name: "director",
  initialState,
  reducers: {
    clearDirector(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDirectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* Exports */
export const { clearDirector } = directorSlice.actions;
export const directorReducer = directorSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Partners,
  PartnersState,
  PartnersApi,
} from "../../types/partners.types";

/* ----------------------------------
 * Mapper (API → Domain)
 * ---------------------------------- */
const mapPartnersFromApi = (item: PartnersApi): Partners => ({
  id: item.id,
  name: item.title,
  image: item.image,
  link:item.link
});

/* ----------------------------------
 * Async Thunk
 * ---------------------------------- */
export const fetchPartners = createAsyncThunk<
  Partners[],
  void,
  { rejectValue: string }
>("partners/fetchPartners", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/partners");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json: { data: PartnersApi[] } = await res.json();

    // ✅ Normalize + type-safe
    return json.data.map(mapPartnersFromApi);
  } catch {
    return rejectWithValue("Failed to load director");
  }
});

/* ----------------------------------
 * Initial State
 * ---------------------------------- */
const initialState: PartnersState = {
  data: [],
  loading: false,
  error: null,
};

/* ----------------------------------
 * Slice
 * ---------------------------------- */
const partnersSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    clearPartners(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* ----------------------------------
 * Exports
 * ---------------------------------- */
export const { clearPartners } = partnersSlice.actions;
export const partnersReducer = partnersSlice.reducer;

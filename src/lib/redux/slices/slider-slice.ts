import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Slider, SlidersState, SliderApi } from "@/lib/types/sliders.types";

/* ----------------------------------
 * Mapper (API → Domain)
 * ---------------------------------- */
const mapSliderFromApi = (item: SliderApi): Slider => ({
  id: item.id,
  image: item.image_url,
  order: item.order,
});

/* ----------------------------------
 * Async Thunk
 * ---------------------------------- */
export const fetchSliders = createAsyncThunk<
  Slider[],
  void,
  { rejectValue: string }
>("sliders/fetchSliders", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/sliders");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json: { data: SliderApi[] } = await res.json();

    // ✅ Normalize + type-safe
    return json.data.map(mapSliderFromApi);
  } catch {
    return rejectWithValue("Failed to load sliders");
  }
});

/* ----------------------------------
 * Initial State
 * ---------------------------------- */
const initialState: SlidersState = {
  data: [],
  loading: false,
  error: null,
};

/* ----------------------------------
 * Slice
 * ---------------------------------- */
const slidersSlice = createSlice({
  name: "sliders",
  initialState,
  reducers: {
    clearSliders(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* ----------------------------------
 * Exports
 * ---------------------------------- */
export const { clearSliders } = slidersSlice.actions;
export const sliderReducer = slidersSlice.reducer;
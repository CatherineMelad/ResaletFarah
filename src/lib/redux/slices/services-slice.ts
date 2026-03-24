import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Service,
  ServicesState,
  ServicesApi,
} from "../../types/services.types";

/* Mapper */
const mapServicesFromApi = (item: ServicesApi): Service => ({
  id: item.id,
  name: item.name,
  description: item.description,
  image: item.image,
  gallery: item.gallery ?? { data: [] },
});

/* Async Thunk */
export const fetchServices = createAsyncThunk<
  Service[],
  void,
  { rejectValue: string }
>("services/fetchServices", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/services");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json: { data: ServicesApi[] } = await res.json();

    return json.data.map(mapServicesFromApi);
  } catch {
    return rejectWithValue("Failed to load services");
  }
});

/* Fetch SINGLE */
export const fetchSingleService = createAsyncThunk<
  Service,
  number,
  { rejectValue: string }
>("services/fetchSingleService", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/services/${id}`);
    if (!res.ok) throw new Error("Request failed");

    const json = await res.json();
    const item = json?.data;

    if (!item) throw new Error("Invalid structure");

    return mapServicesFromApi(item);
  } catch {
    return rejectWithValue("Failed to load service item");
  }
});

/* Initial State */
const initialState: ServicesState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

/* Slice */
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServices(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(fetchSingleService.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchSingleService.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload;
      })
      .addCase(fetchSingleService.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? "Error";
      });
  },
});

/* Exports */
export const { clearServices } = servicesSlice.actions;
export const servicesReducer = servicesSlice.reducer;

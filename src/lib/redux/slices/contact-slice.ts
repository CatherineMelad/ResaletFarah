import { Contact, ContactState } from "@/lib/types/contact.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Async Thunk */
export const fetchContact = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contact/fetchContact", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/contact");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json = await res.json();
    return json.data as Contact[];
  } catch {
    return rejectWithValue("Failed to load contact details");
  }
});

/* Initial State */
const initialState: ContactState = {
  data: [],
  loading: false,
  error: null,
};

/* Slice */
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContact(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

/* Exports */
export const { clearContact } = contactSlice  .actions;
export const contactReducer = contactSlice.reducer;

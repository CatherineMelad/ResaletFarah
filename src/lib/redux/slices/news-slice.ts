import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { News, NewsState, NewsApi } from "../../types/news.types";

/* Mapper */
const mapNewsFromApi = (item: NewsApi): News => ({
  id: item.id,
  title: item.title,
  description: item.description,
  thumbnail: item.thumbnail,
  gallery: item.gallery || [],
});

/* Async Thunk */
export const fetchNews = createAsyncThunk<
  News[],
  void,
  { rejectValue: string }
>("news/fetchNews", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/news");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const json: { data: NewsApi[] } = await res.json();

    return json.data.map(mapNewsFromApi);
  } catch {
    return rejectWithValue("Failed to load news");
  }
});

/* Fetch SINGLE */
export const fetchSingleNews = createAsyncThunk<
  News,
  number,
  { rejectValue: string }
>("news/fetchSingleNews", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/news/${id}`);
    if (!res.ok) throw new Error("Request failed");

    const json = await res.json();
    const item = json?.data;

    if (!item) throw new Error("Invalid structure");

    return mapNewsFromApi(item);
  } catch {
    return rejectWithValue("Failed to load news item");
  }
});

/* Initial State */
const initialState: NewsState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

/* Slice */
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(fetchSingleNews.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchSingleNews.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload;
      })
      .addCase(fetchSingleNews.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? "Error";
      });
  },
});

/* Exports */
export const { clearNews } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;

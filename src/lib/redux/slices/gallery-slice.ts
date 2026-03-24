import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Gallery, GalleryState, GalleryApi } from "../../types/gallery.types";

/* Mapper */
const mapGalleryFromApi = (item: GalleryApi): Gallery => ({
  id: item.id,
  title: item.title,
  thumbnail: item.thumbnail,
  type: item.type,
  images: item.images.map((img) => ({
    id: img.id,
    image_path: img.image_path,
  })),
});

/* Fetch ALL */
export const fetchGallery = createAsyncThunk<
  Gallery[],
  void,
  { rejectValue: string }
>("gallery/fetchGallery", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/gallery");
    if (!res.ok) throw new Error("Request failed");

    const json = await res.json();

    const arr = json?.data?.data; // ✅ IMPORTANT

    if (!Array.isArray(arr)) throw new Error("Invalid structure");

    return arr.map(mapGalleryFromApi);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load gallery";
    return rejectWithValue(message);
  }
});

/* Fetch SINGLE */
export const fetchSingleGallery = createAsyncThunk<
  Gallery,
  number,
  { rejectValue: string }
>("gallery/fetchSingleGallery", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/gallery/${id}`);
    if (!res.ok) throw new Error("Request failed");

    const json = await res.json();
    const item = json?.data;

    if (!item) throw new Error("Invalid structure");

    return mapGalleryFromApi(item);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load gallery item";
    return rejectWithValue(message);
  }
});

/* State */
const initialState: GalleryState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchGallery.fulfilled, (s, a) => {
        s.loading = false;
        s.data = a.payload;
      })
      .addCase(fetchGallery.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? "Error";
      })

      .addCase(fetchSingleGallery.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchSingleGallery.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload;
      })
      .addCase(fetchSingleGallery.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? "Error";
      });
  },
});

export const galleryReducer = gallerySlice.reducer;

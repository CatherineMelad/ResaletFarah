import { configureStore } from "@reduxjs/toolkit";
import { sliderReducer } from "@/lib/redux/slices/slider-slice";
import { aboutReducer } from "./slices/about-slice";
import { directorReducer } from "./slices/director-slice";
import { partnersReducer } from "./slices/partners-slice";
import { whoWeAreReducer } from "./slices/who-we-are-slice";
import { newsReducer } from "./slices/news-slice";
import { galleryReducer } from "./slices/gallery-slice";
import { servicesReducer } from "./slices/services-slice";
import { storiesReducer } from "./slices/stories-slice";
import { contactReducer } from "./slices/contact-slice";

export const store = configureStore({
  reducer: {
    sliders: sliderReducer,
    about: aboutReducer,
    directors: directorReducer,
    partners: partnersReducer,
    whoWeAre: whoWeAreReducer,
    news: newsReducer,
    gallery: galleryReducer,
    services: servicesReducer,
    stories: storiesReducer,  
    contact: contactReducer,      
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

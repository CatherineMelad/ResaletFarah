export interface Slider {
  id: number;
  image: string;
  order: number;
}

export interface SlidersState {
  data: Slider[];
  loading: boolean;
  error: string | null;
}

export interface SliderApi {
  id: number;
  title: string | null;
  description: string | null;
  image_url: string;
  order: number;
  status: number;
  created_at: string;
  updated_at: string;
}
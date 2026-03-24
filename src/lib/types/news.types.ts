export interface News {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  gallery: {
    image_path: string;
  }[];
}

export interface NewsState {
  data: News[];
  selected: News | null;
  loading: boolean;
  error: string | null;
}

export interface NewsApi {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  gallery?: {
    image_path: string;
  }[];
}

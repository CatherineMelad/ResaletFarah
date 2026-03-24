export interface Partners {
  id: number;
  name: string | null;
  image: string;
  link: string | null;
}

export interface PartnersState {
  data: Partners[];
  loading: boolean;
  error: string | null;
}

export interface PartnersApi {
  id: number;
  title: string | null;
  image: string;
  link: string | null;
}

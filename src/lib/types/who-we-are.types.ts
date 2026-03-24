export interface WhoWeAre {
  id: number;
  title: string | null;
  description: string | null;
  image: string;
  order: number;
}

export interface WhoWeAreState {
  data: WhoWeAre[];
  loading: boolean;
  error: string | null;
}


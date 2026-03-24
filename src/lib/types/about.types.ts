export interface About {
  id: number;
  title: string;
  description: string;
}

export interface AboutState {
  data: About[];
  loading: boolean;
  error: string | null;
}

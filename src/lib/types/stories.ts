export interface Story {
  id: number;
  title: string | null;
  description: string | null;
  image: string;
}

export interface StoriesState {
  data: Story[];
  loading: boolean;
  error: string | null;
}


export interface Director {
  id: number;
  image: string;
  name: string | null;
  position: string;
  description: string | null;
  email: string;
  phone: number;
}

export interface DirectorState {
  data: Director[];
  loading: boolean;
  error: string | null;
}

export interface DirectorApi {
  id: number;
  name: string | null;
  position: string;
  image_path: string;
  description: string | null;
  email: string;
  phone: number;
}

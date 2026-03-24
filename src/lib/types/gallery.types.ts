export interface GalleryImage {
  id: number;
  image_path: string;
}

export interface Gallery {
  id: number;
  title: string;
  thumbnail: string | null;
  images: GalleryImage[];
  type?: string; 
}

export interface GalleryState {
  data: Gallery[];
  selected: Gallery | null; 
  loading: boolean;
  error: string | null;
}

export interface GalleryApi {
  id: number;
  title: string;
  thumbnail: string | null;
  images: GalleryImage[];
  type: string;
}
export interface ServiceGalleryImage {
  id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceGalleryItem {
  type: string;
  id: number;
  title: string;
  thumbnail: string;
  images: ServiceGalleryImage[];
}

export interface Service {
  id: number;
  name: string;        
  description: string | null;
  image: string;       
  gallery: {
    data: ServiceGalleryItem[];
  };
}

export interface ServicesState {
  data: Service[];
  selected: Service | null;
  loading: boolean;
  error: string | null;
}

export interface ServicesApi {
  id: number;
  name: string;        
  description: string | null;
  image: string;       
  gallery?: {
    data: ServiceGalleryItem[];
  };
}
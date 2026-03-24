export interface Contact {
  id: number;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export interface ContactState {
  data: Contact[];
  loading: boolean;
  error: string | null;
}

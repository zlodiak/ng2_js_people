export interface User {
  id?: number;
  password: string;
  name: string;
  email: string;
  mobile?: string;
  about?: string;
  skills?: string;
  city?: string;
  photo?: string;
  createdDateUnix?: string;
  lat?: number;
  lng?: number;
}



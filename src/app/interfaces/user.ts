export interface User {
  id?: number;
  password: string;
  name: string;
  email: string;
  info?: string;
  city?: string;
  icon?: string;
  createdDateUnix?: string;
  lat?: number;
  lng?: number;
}



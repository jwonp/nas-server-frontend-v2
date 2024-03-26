export interface UserSession {
  id: string;
  username: string;
  name: string;
  icon: string;
  image: string;
  phone: string;
  admin?: string;
  expireIn?: number;
}

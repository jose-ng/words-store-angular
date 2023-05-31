import { User } from './user.model';

export interface LoginData {
  email: string;
  password: string;
}

export interface TokenData {
  token: string;
  user: User;
}

export interface FireBaseTokenData {
  user: { email: string; accessToken: string };
}

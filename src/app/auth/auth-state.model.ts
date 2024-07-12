export interface AuthStateModel {
  token: string;
  user: User;
}

interface User {
  userName: string;
  fullName: string;
  email: string;
}

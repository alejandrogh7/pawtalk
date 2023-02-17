export interface SigninPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  posts: any[];
  rooms: any[];
  createdRooms: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface SigninResponse {
  user: User;
  tokens: Tokens;
}

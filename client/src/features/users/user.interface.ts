export interface SigninPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface Room {
  _id: string;
  roomname: string;
}

export interface Post {
  _id: string;
  text: string;
  room: Room;
}

export interface CreatedRoom {
  _id: string;
  roomname: string;
}

export interface Room2 {
  _id: string;
  roomname: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  posts: Post[];
  rooms: Room2[];
  createdRooms: CreatedRoom[];
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

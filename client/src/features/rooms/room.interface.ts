interface User {
  _id: string;
  name: string;
}

interface Creator {
  _id: string;
  name: string;
}

interface Sender {
  _id: string;
  name: string;
}

export interface Post {
  _id: string;
  text: string;
  sender: Sender;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rooms {
  _id: string;
  roomname: string;
  description: string;
  creator: Creator;
}

export interface Room {
  _id: string;
  roomname: string;
  description: string;
  users: User[];
  creator: Creator;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoom {
  roomname: string;
  description: string;
  userId: string;
}

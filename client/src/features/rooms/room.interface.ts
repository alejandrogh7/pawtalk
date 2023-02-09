export interface Rooms {
  _id: string;
  image: string;
  roomname: string;
  description: string;
  creator: Creator;
}

export interface Creator {
  _id: string;
  name: string;
}

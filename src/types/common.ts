export interface User {
  id: number;
  email: string;
  username: string;
  profileImageUrl?: string;
}

export interface MessageProp {
  self?: boolean;
  data?: string;
  time?: Date;
  type: string;
}

export interface filesProp {
  id: number;
  data: string;
}

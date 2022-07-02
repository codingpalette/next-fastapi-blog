export interface UserBase {
  id: number;
  email: string;
  nickname: string;
  password: string;
}

export interface IUser extends UserBase {
  level: number;
  exp: number;
}
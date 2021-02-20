export interface IUser {
  _id?: string;
  password: string;
  email: string;
  emailVerified: boolean;
  salt: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserAuth {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: string;
}

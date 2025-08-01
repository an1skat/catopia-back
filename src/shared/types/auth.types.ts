export interface RegisterArgs {
  input: {
    name: string;
    email: string;
    password: string;
  };
}

export interface LoginArgs {
  email: string;
  password: string;
}

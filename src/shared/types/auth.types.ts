export interface RegisterArgs {
  input: {
    name: string;
    email: string;
    password: string;
  };
}

export interface LoginArgs {
  input: {
    email: string;
    password: string;
  };
}

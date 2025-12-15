export interface User {
  id: string;
  email: string;
  name: string;
  gender: 'male' | 'female';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
  gender: 'male' | 'female';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  avatar?: string | null;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ChangeEmailInput {
  newEmail: string;
  password: string;
}

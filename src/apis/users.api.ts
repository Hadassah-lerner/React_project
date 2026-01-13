import axios from './axios';
import { UserModel } from '../models/UserModel';

export const getUserByEmail = async (email: string): Promise<UserModel | null> => {
  const res = await axios.get<UserModel[]>('/users', {
    params: { email },
  });
 return res.data.length ? res.data[0] : null;
 };

export const createUser = async (
  user: Omit<UserModel, 'id'>
): Promise<UserModel> => {
  const res = await axios.post<UserModel>('/users', user);
  return res.data;
};

export const updateUser = async (
  id: string,
  user: Partial<UserModel>
): Promise<UserModel> => {
  const res = await axios.put<UserModel>(`/users/${id}`, user);
  return res.data;
};


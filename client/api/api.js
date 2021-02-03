import axios from 'axios';
import { useAuth } from '../store/users/AuthContext';

const instance = axios.create({ baseURL: '/api' });

export const useAPI = () => {
  const auth = useAuth();

  if (auth.token) {
    instance.defaults.headers.common['Authorization'] = auth.token;
  }

  return instance;
};

import axios from 'axios';
import { useAuth } from '../store/users/AuthContext';

export const useAPI = () => {
  const auth = useAuth();
  const instance = axios.create({ baseURL: '/api' });
  instance.defaults.headers.common['Authorization'] = auth.token ? `Bearer ${auth.token}` : null;
  return instance;
};

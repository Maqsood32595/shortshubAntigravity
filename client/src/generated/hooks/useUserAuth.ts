
// Auto-generated hook for User Authentication
// Source: features/user-auth.yaml

import { useStore } from '../../core/state';
import { api } from '../../connectors/api';

export const useUserAuth = () => {
  const store = useStore();
  
  // State selectors
  const user = (store as any).user;
  const isAuthenticated = (store as any).isAuthenticated;
  
  // Actions
  
  const login = async (...args: any[]) => {
    try {
      const result = await api.post('/api/user-auth/login', ...args);
      return result.data;
    } catch (error) {
      console.error('login failed:', error);
      throw error;
    }
  };
  
  return {
    user,
    isAuthenticated,
    login
  };
};

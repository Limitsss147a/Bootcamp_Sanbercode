import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook untuk mempermudah penggunaan AuthContext.
 * @returns {object} Nilai dari AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
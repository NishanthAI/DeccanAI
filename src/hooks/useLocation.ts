import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

export const useLocation = () => {
  return useContext(LocationContext);
};
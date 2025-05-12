import { useContext, useEffect } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Location } from '../types/location';

export const useWeather = (location: Location | null) => {
  const weatherContext = useContext(WeatherContext);
  
  useEffect(() => {
    // We can't directly set location in the WeatherContext
    // because it might cause unnecessary re-renders
    // Instead, we update the query key in react-query
  }, [location]);
  
  return weatherContext;
};
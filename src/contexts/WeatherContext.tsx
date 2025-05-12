import React, { createContext, useState } from 'react';
import { Location } from '../types/location';
import { WeatherData } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';
import { useQuery } from 'react-query';

interface WeatherContextType {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: unknown;
  refreshWeather: () => void;
}

export const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  isLoading: false,
  error: null,
  refreshWeather: () => {},
});

interface WeatherProviderProps {
  children: React.ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  
  const { data, isLoading, error, refetch } = useQuery(
    ['weather', location?.id],
    () => fetchWeatherData(location),
    {
      enabled: !!location,
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
  
  const refreshWeather = () => {
    if (location) {
      refetch();
    }
  };
  
  return (
    <WeatherContext.Provider
      value={{
        weatherData: data || null,
        isLoading,
        error,
        refreshWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
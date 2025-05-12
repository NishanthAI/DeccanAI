import axios from 'axios';
import { Location } from '../types/location';
import { WeatherData } from '../types/weather';
import { mockWeatherData, mockLocations } from './mockData';

// In a real app, you'd use an actual weather API
// const API_KEY = 'your-api-key';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (location: Location | null): Promise<WeatherData> => {
  if (!location) {
    throw new Error('Location is required');
  }
  
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you'd make an actual API request
  // const response = await axios.get(
  //   `${BASE_URL}/onecall?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=imperial`
  // );
  
  // For demo purposes, return mock data
  const data = mockWeatherData;
  
  // Update current location's condition for favorites display
  if (location) {
    location.lastCondition = data.current.condition;
  }
  
  return data;
};

export const searchLocations = async (query: string): Promise<Location[]> => {
  if (!query || query.length < 2) {
    return [];
  }
  
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you'd make an actual API request
  // const response = await axios.get(
  //   `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  // );
  
  // For demo purposes, filter mock locations
  const queryLower = query.toLowerCase();
  const filteredLocations = mockLocations.filter(
    location => 
      location.name.toLowerCase().includes(queryLower) ||
      location.country.toLowerCase().includes(queryLower)
  );
  
  return filteredLocations;
};
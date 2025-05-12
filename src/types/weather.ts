export interface CurrentWeatherData {
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  lastUpdated: string;
  alerts?: Alert[];
  airQuality?: AirQuality;
}

export interface Alert {
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe';
}

export interface AirQuality {
  index: number;
  description: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
  hourly: HourlyForecast[];
}

export interface ForecastData {
  daily: DailyForecast[];
}

export interface HistoricalDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  windSpeed: number;
}

export interface HistoricalData {
  days: HistoricalDay[];
}

export interface WeatherData {
  current: CurrentWeatherData;
  forecast: ForecastData;
  history: HistoricalData;
}
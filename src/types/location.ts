export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  lastCondition?: string;
}
export interface EarthquakeRecord {
  id: string;
  time: string;
  place: string;
  mag: number | null;
  latitude: number | null;
  longitude: number | null;
  depth: number | null;
  [key: string]: string | number | null;
}
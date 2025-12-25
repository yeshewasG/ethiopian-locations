export interface GeoName {
  en: string;
}

export interface BaseLocation {
  id: string;
  name: GeoName;
  latLong: number[];
}

export interface Region extends BaseLocation {}
export interface Zone extends BaseLocation {
  regionId: string;
}
export interface Woreda extends BaseLocation {
  zoneId: string;
}

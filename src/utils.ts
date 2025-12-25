import regionsData from "./data/regions.json";
import zonesData from "./data/zones.json";
import woredasData from "./data/woredas.json";

import type { Region, Zone, Woreda } from "./types";

/**
 * Simple in-memory cache for optimized lookups.
 */
const cache: {
  regions?: Region[];
  zonesMap?: Map<string, Zone[]>;
  woredasMap?: Map<string, Woreda[]>;
  hierarchy?: RegionHierarchy[];
} = {};

/**
 * Type representing a Region with nested zones and woredas
 */
export interface RegionHierarchy extends Region {
  zones: ZoneHierarchy[];
}

export interface ZoneHierarchy extends Zone {
  woredas: Woreda[];
}

/**
 * Returns all regions.
 */
export const getRegions = (): Region[] => {
  if (!cache.regions) {
    cache.regions = regionsData;
  }
  return cache.regions;
};

/**
 * Returns zones by region ID with caching.
 * @param regionId - ID of the region
 */
export const getZonesByRegion = (regionId: string): Zone[] => {
  if (!cache.zonesMap) {
    // Build a map of regionId -> zones for fast lookup
    cache.zonesMap = new Map<string, Zone[]>();
    zonesData.forEach((zone: Zone) => {
      const arr = cache.zonesMap!.get(zone.regionId) || [];
      arr.push(zone);
      cache.zonesMap!.set(zone.regionId, arr);
    });
  }
  return cache.zonesMap.get(regionId) || [];
};

/**
 * Returns woredas by zone ID with caching.
 * @param zoneId - ID of the zone
 */
export const getWoredasByZone = (zoneId: string): Woreda[] => {
  if (!cache.woredasMap) {
    // Build a map of zoneId -> woredas for fast lookup
    cache.woredasMap = new Map<string, Woreda[]>();
    woredasData.forEach((woreda: Woreda) => {
      const arr = cache.woredasMap!.get(woreda.zoneId) || [];
      arr.push(woreda);
      cache.woredasMap!.set(woreda.zoneId, arr);
    });
  }
  return cache.woredasMap.get(zoneId) || [];
};

/**
 * Returns full hierarchy of regions → zones → woredas.
 * Uses map-based caching for optimal performance.
 */
export const getHierarchy = (): RegionHierarchy[] => {
  if (!cache.hierarchy) {
    const regions = getRegions();
    const zonesMap = new Map<string, Zone[]>(
      zonesData.map((z: Zone) => [z.regionId, []])
    );
    zonesData.forEach((zone: Zone) => {
      const arr = zonesMap.get(zone.regionId)!;
      arr.push(zone);
      zonesMap.set(zone.regionId, arr);
    });

    const woredasMap = new Map<string, Woreda[]>(
      woredasData.map((w: Woreda) => [w.zoneId, []])
    );
    woredasData.forEach((w: Woreda) => {
      const arr = woredasMap.get(w.zoneId)!;
      arr.push(w);
      woredasMap.set(w.zoneId, arr);
    });

    cache.hierarchy = regions.map((region: Region) => ({
      ...region,
      zones: (zonesMap.get(region.id) || []).map((zone) => ({
        ...zone,
        woredas: woredasMap.get(zone.id) || [],
      })),
    }));
  }
  return cache.hierarchy;
};

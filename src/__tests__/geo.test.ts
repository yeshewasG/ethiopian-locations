import {
  getRegions,
  getZonesByRegion,
  getWoredasByZone,
  getHierarchy,
} from "../index";
import type { Region, Zone, Woreda } from "../types";

describe("Ethiopian Geo Data", () => {
  it("should return all regions", () => {
    const regions: Region[] = getRegions();
    expect(regions.length).toBeGreaterThan(0);
    expect(regions[0]).toHaveProperty("id");
    expect(regions[0]).toHaveProperty("name");
  });

  it("should return zones by region", () => {
    const regions: Region[] = getRegions();
    const regionId = regions[0].id;
    const zones: Zone[] = getZonesByRegion(regionId);
    expect(zones.every((z) => z.regionId === regionId)).toBe(true);
  });

  it("should return woredas by zone", () => {
    const zones = getZonesByRegion(getRegions()[0].id);
    if (zones.length === 0) return;
    const zoneId = zones[0].id;
    const woredas: Woreda[] = getWoredasByZone(zoneId);
    expect(woredas.every((w) => w.zoneId === zoneId)).toBe(true);
  });

  it("should return full hierarchy", () => {
    const hierarchy = getHierarchy();
    expect(hierarchy.length).toBeGreaterThan(0);
    hierarchy.forEach((region) => {
      expect(region).toHaveProperty("zones");
      region.zones.forEach((zone) => {
        expect(zone).toHaveProperty("woredas");
      });
    });
  });
});

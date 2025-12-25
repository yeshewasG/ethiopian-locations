# ethiopian-location

A TypeScript package for Ethiopian regions, zones, and woredas hierarchy with fast lookup and caching.

## Features

- Get all regions of Ethiopia
- Get zones by region
- Get woredas by zone
- Full hierarchical structure: regions → zones → woredas
- Fast lookup with in-memory caching
- TypeScript types included

---

## Installation

```bash
npm install ethiopian-location
```

## Usage

Import the functions from the package:

```typescript
import {
  getRegions,
  getZonesByRegion,
  getWoredasByZone,
  getHierarchy,
} from "ethiopian-location";
```

1. Get all regions

```typescript
const regions = getRegions();
console.log(regions);
```

Example output:

```json
[
  {
    "id": "ET01",
    "name": { "en": "Tigray" },
    "latLong": [14.0, 38.0]
  },
  {
    "id": "ET02",
    "name": { "en": "Afar" },
    "latLong": [11.5, 40.0]
  }
]
```

2. Get zones by region

```typescript
const zones = getZonesByRegion("ET01");
console.log(zones);
```

Example output:

```json
[
  {
    "id": "ET0101",
    "regionId": "ET01",
    "name": { "en": "Mekelle" },
    "latLong": [13.5, 39.0]
  }
]
```

3. Get woredas by zone

```typescript
const woredas = getWoredasByZone("ET0101");
console.log(woredas);
```

Example output:

```json
[
  {
    "id": "ET010101",
    "zoneId": "ET0101",
    "name": { "en": "Tahtay Adiyabo" },
    "latLong": [14.44, 37.67]
  }
]
```

4. Get full hierarchy (regions → zones → woredas)

```typescript
const hierarchy = getHierarchy();
console.log(JSON.stringify(hierarchy, null, 2));
```

Example output:

```json
[
  {
    "id": "ET01",
    "name": { "en": "Tigray" },
    "latLong": [14.0, 38.0],
    "zones": [
      {
        "id": "ET0101",
        "regionId": "ET01",
        "name": { "en": "Mekelle" },
        "latLong": [13.5, 39.0],
        "woredas": [
          {
            "id": "ET010101",
            "zoneId": "ET0101",
            "name": { "en": "Tahtay Adiyabo" },
            "latLong": [14.44, 37.67]
          }
        ]
      }
    ]
  }
]
```

## API Reference

1. getRegions(): Region[]Returns all Ethiopian regions.

2. getZonesByRegion(regionId: string): Zone[]Returns zones belonging to a given region.

3. getWoredasByZone(zoneId: string): Woreda[]Returns woredas belonging to a given zone.

4. getHierarchy(): RegionWithZonesAndWoredas[]Returns the full hierarchical structure.

## Contributing

Contributions are welcome!Feel free to open issues or submit pull requests to improve data accuracy, add features, or enhance performance.

## License

MIT License © 2025

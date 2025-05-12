import axios from "axios";
import type { LocationSearch } from "@/models/LocationSearch";

export const fetchLocationSearch = async (
  query: string
): Promise<LocationSearch> => {
  const response = await axios.get(process.env.MAPBOX_BASE_URL as string, {
    params: {
      q: query,
      access_token: process.env.MAPBOX_KEY,
      types: "place",
    },
  });

  return mapToLocationSearch(response.data);
};

const mapToLocationSearch = (data: any): LocationSearch => {
  return {
    features: data.features.map((feature: any) => ({
      id: feature.id,
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates,
      },
      properties: {
        full_address: feature.properties.full_address,
      },
    })),
  };
};

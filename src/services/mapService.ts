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

  return response.data as LocationSearch;
};

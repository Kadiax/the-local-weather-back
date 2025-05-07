import axios from "axios";
import type { LocationSearch } from "../models/LocationSearch";

const MAPBOX_API_URL = "https://api.mapbox.com/search/geocode/v6/forward";

export const fetchLocationSearch = async (
  query: string
): Promise<LocationSearch> => {
  const response = await axios.get(MAPBOX_API_URL, {
    params: {
      q: query,
      access_token: process.env.MAPBOX_TOKEN,
      types: "place",
    },
  });

  return response.data as LocationSearch;
};

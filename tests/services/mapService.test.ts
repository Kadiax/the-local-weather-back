import { fetchLocationSearch } from "../../src/services/mapService";
import axios from "axios";

jest.mock("axios");

describe("fetchLocationSearch", () => {
  it("should transform location data correctly", async () => {
    // 1. Mock API response
    const mockApiResponse = {
      data: {
        features: [
          {
            id: "place.123",
            geometry: {
              type: "Point",
              coordinates: [2.3522, 48.8566],
            },
            properties: {
              full_address: "Paris, France",
            },
            other_field: "should not be included",
          },
        ],
        other_data: "should not be included",
      },
    };

    // 2. Configure axios mock
    (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

    // 3. Call fetchLocationSearch
    const result = await fetchLocationSearch("Paris");

    // 4. Verify transformed result
    expect(result).toEqual({
      features: [
        {
          id: "place.123",
          geometry: {
            type: "Point",
            coordinates: [2.3522, 48.8566],
          },
          properties: {
            full_address: "Paris, France",
          },
        },
      ],
    });

    // 5. Verify API call parameters
    expect(axios.get).toHaveBeenCalledWith(process.env.MAPBOX_BASE_URL, {
      params: {
        q: "Paris",
        access_token: process.env.MAPBOX_KEY,
        types: "place",
      },
    });
  });

  it("should handle API error correctly", async () => {
    // 1. Simulate API error
    const mockError = new Error("Location Search API Error");
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    // 2. Check if error is propagated
    await expect(fetchLocationSearch("Invalid City")).rejects.toThrow(
      "Location Search API Error"
    );

    // 3. Verify API call was made with correct parameters
    expect(axios.get).toHaveBeenCalledWith(process.env.MAPBOX_BASE_URL, {
      params: {
        q: "Invalid City",
        access_token: process.env.MAPBOX_KEY,
        types: "place",
      },
    });
  });
});

import request from "supertest";
import express from "express";
import mapRoutes from "@/routes/map";
import { fetchLocationSearch } from "@/services/mapService";

// Mock the entire mapService
jest.mock("@/services/mapService");

describe("Map Routes", () => {
  // Create a minimal Express app for testing
  const app = express();
  app.use("/api/map", mapRoutes);

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/map", () => {
    it("should return location data when city query is valid", async () => {
      // Prepare mocked data
      const mockLocationData = {
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
      };

      // Configure the mock
      (fetchLocationSearch as jest.Mock).mockResolvedValue(mockLocationData);

      // Simulate HTTP request
      const response = await request(app)
        .get("/api/map")
        .query({ city: "Paris" });

      // Verify response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockLocationData);

      // Verify that the service was called correctly
      expect(fetchLocationSearch).toHaveBeenCalledWith("Paris");
    });

    it("should return 400 when city query is missing", async () => {
      // Simulate request without city parameter
      const response = await request(app).get("/api/map");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Missing city query" });

      // Verify that the service wasn't called
      expect(fetchLocationSearch).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws error", async () => {
      // Simulate service error
      (fetchLocationSearch as jest.Mock).mockRejectedValue(
        new Error("Location Search Failed")
      );

      const response = await request(app)
        .get("/api/map")
        .query({ city: "InvalidCity" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});

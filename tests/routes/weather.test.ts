import request from "supertest";
import express from "express";
import weatherRoutes from "@/routes/weather";
import { fetchAllWeatherData, fetchWeather } from "@/services/weatherService";

// 1. Mock the entire weatherService
jest.mock("@/services/weatherService");

describe("Weather Routes", () => {
  // 2. Create a minimal Express app for testing
  const app = express();
  app.use("/api/weather", weatherRoutes);

  // 3. Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/weather", () => {
    it("should return weather data when lat and lon are valid", async () => {
      // 4. Prepare mocked data that the service will return
      const mockWeatherData = {
        dt: 1234567890,
        main: {
          temp: 20,
          humidity: 50,
        },
        weather: [{ icon: "01d" }],
      };

      // 5. Tell the mocked service to return this data
      (fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);

      // 6. Simulate HTTP request
      const response = await request(app)
        .get("/api/weather")
        .query({ lat: "48.8566", lon: "2.3522" });

      // 7. Verify response
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockWeatherData);

      // 8. Verify that the service was called correctly
      expect(fetchWeather).toHaveBeenCalledWith(48.8566, 2.3522);
    });

    it("should return 400 when lat or lon is missing", async () => {
      const response = await request(app)
        .get("/api/weather")
        .query({ lat: "48.8566" }); // lon is missing

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Missing lat/lon" });

      // Verify that the service wasn't called
      expect(fetchWeather).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws error", async () => {
      // Simulate service error
      (fetchWeather as jest.Mock).mockRejectedValue(new Error("Service error"));

      const response = await request(app)
        .get("/api/weather")
        .query({ lat: "48.8566", lon: "2.3522" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("GET /api/weather/all", () => {
    it("should return all weather data when lat and lon are valid", async () => {
      const mockAllWeatherData = {
        weather: { main: { temp: 20 } },
        forecast: { list: [] },
        pollution: { list: [] },
      };

      (fetchAllWeatherData as jest.Mock).mockResolvedValue(mockAllWeatherData);

      const response = await request(app)
        .get("/api/weather/all")
        .query({ lat: "48.8566", lon: "2.3522" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAllWeatherData);
      expect(fetchAllWeatherData).toHaveBeenCalledWith(48.8566, 2.3522);
    });
  });
});

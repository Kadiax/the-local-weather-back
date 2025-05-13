import {
  fetchWeather,
  fetchForecast,
  fetchAirPollution,
  fetchAllWeatherData,
} from "../../src/services/weatherService";
import axios from "axios";

jest.mock("axios");

describe("fetchWeather", () => {
  it("should transform weather data correctly", async () => {
    // 1. Mock axios response
    const mockApiResponse = {
      data: {
        dt: 1234567890,
        timezone: 3600,
        main: {
          temp: 20,
          temp_max: 25,
          temp_min: 15,
          feels_like: 22,
          pressure: 1013,
          humidity: 50,
        },
        wind: {
          speed: 5,
        },
        weather: [{ icon: "01d", description: "clear sky" }],
        sys: {
          sunrise: 1234567000,
          sunset: 1234599999,
        },
      },
    };

    // 2. Configure axios mock
    (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

    // 3. Call fetchWeather
    const result = await fetchWeather(48.8566, 2.3522);

    // 4. Real mapToWeatherData function is used on mocked data
    expect(result).toEqual({
      dt: 1234567890,
      timezone: 3600,
      main: {
        temp: 20,
        temp_max: 25,
        temp_min: 15,
        feels_like: 22,
        pressure: 1013,
        humidity: 50,
      },
      wind: {
        speed: 5,
      },
      weather: [{ icon: "01d", description: "clear sky" }],
      sys: {
        sunrise: 1234567000,
        sunset: 1234599999,
      },
    });
  });

  it("should handle API error correctly", async () => {
    // 1. Simulate API error
    const mockError = new Error("API Error");
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    // 2. Check if error is propagated
    await expect(fetchWeather(48.8566, 2.3522)).rejects.toThrow("API Error");

    // 3. Verify API call parameters
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.OPENWEATHERMAP_BASE_URL}/weather`,
      {
        params: {
          lat: 48.8566,
          lon: 2.3522,
          appid: process.env.OPENWEATHERMAP_KEY,
          units: "metric",
        },
      }
    );
  });
});

describe("fetchForecast", () => {
  it("should transform forecast data correctly", async () => {
    // 1. Mock API response
    const mockApiResponse = {
      data: {
        list: [
          {
            dt: 1234567890,
            main: {
              temp: 22,
            },
            weather: [{ icon: "01d" }],
          },
          {
            dt: 1234571490,
            main: {
              temp: 25,
            },
            weather: [{ icon: "02d" }],
          },
        ],
      },
    };

    // 2. Configure mock
    (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

    // 3. Call fetchForecast
    const result = await fetchForecast(48.8566, 2.3522);

    // 4. Verify transformed result
    expect(result).toEqual({
      list: [
        {
          dt: 1234567890,
          main: {
            temp: 22,
          },
          weather: [{ icon: "01d" }],
        },
        {
          dt: 1234571490,
          main: {
            temp: 25,
          },
          weather: [{ icon: "02d" }],
        },
      ],
    });
  });

  it("should handle API error correctly", async () => {
    // 1. Simuler une erreur d'API
    const mockError = new Error("Forecast API Error");
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    // 2. Vérifier que l'erreur est propagée
    await expect(fetchForecast(48.8566, 2.3522)).rejects.toThrow(
      "Forecast API Error"
    );

    // 3. Vérifier que l'appel à l'API a été fait avec les bons paramètres
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.OPENWEATHERMAP_BASE_URL}/forecast`,
      {
        params: {
          lat: 48.8566,
          lon: 2.3522,
          appid: process.env.OPENWEATHERMAP_KEY,
          units: "metric",
        },
      }
    );
  });
});

describe("fetchAirPollution", () => {
  it("should transform pollution data correctly", async () => {
    // 1. Mock API response
    const mockApiResponse = {
      data: {
        list: [
          {
            main: {
              aqi: 2,
            },
            components: {
              co: 250.34,
              no2: 13.25,
              pm10: 9.23,
            },
          },
        ],
      },
    };

    // 2. Configure mock
    (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

    // 3. Call fetchAirPollution
    const result = await fetchAirPollution(48.8566, 2.3522);

    // 4. Verify transformed result
    expect(result).toEqual({
      list: [
        {
          main: {
            aqi: 2,
          },
          components: {
            co: 250.34,
            no2: 13.25,
            pm10: 9.23,
          },
        },
      ],
    });
  });

  it("should handle API error correctly", async () => {
    // 1. Simuler une erreur d'API
    const mockError = new Error("Air Pollution API Error");
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    // 2. Vérifier que l'erreur est propagée
    await expect(fetchAirPollution(48.8566, 2.3522)).rejects.toThrow(
      "Air Pollution API Error"
    );

    // 3. Vérifier que l'appel à l'API a été fait avec les bons paramètres
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.OPENWEATHERMAP_BASE_URL}/air_pollution`,
      {
        params: {
          lat: 48.8566,
          lon: 2.3522,
          appid: process.env.OPENWEATHERMAP_KEY,
        },
      }
    );
  });
});

describe("fetchAllWeatherData", () => {
  it("should fetch and combine all weather data correctly", async () => {
    // 1. Mock responses for each API call
    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes("/weather")) {
        return Promise.resolve({
          data: {
            dt: 1234567890,
            main: { temp: 20 },
            weather: [{ icon: "01d" }],
            wind: { speed: 5 },
            sys: { sunrise: 1234567000, sunset: 1234599999 },
          },
        });
      }
      if (url.includes("/forecast")) {
        return Promise.resolve({
          data: {
            list: [
              {
                dt: 1234567890,
                main: { temp: 22 },
                weather: [{ icon: "02d" }],
              },
            ],
          },
        });
      }
      if (url.includes("/air_pollution")) {
        return Promise.resolve({
          data: {
            list: [
              {
                main: { aqi: 2 },
                components: { co: 250.34 },
              },
            ],
          },
        });
      }
    });

    // 2. Call function
    const result = await fetchAllWeatherData(48.8566, 2.3522);

    // 3. Verify complete structure
    expect(result).toEqual({
      weather: {
        dt: 1234567890,
        main: { temp: 20 },
        weather: [{ icon: "01d" }],
        wind: { speed: 5 },
        sys: { sunrise: 1234567000, sunset: 1234599999 },
      },
      forecast: {
        list: [
          {
            dt: 1234567890,
            main: { temp: 22 },
            weather: [{ icon: "02d" }],
          },
        ],
      },
      pollution: {
        list: [
          {
            main: { aqi: 2 },
            components: { co: 250.34 },
          },
        ],
      },
    });
  });

  it("should handle errors from any of the API calls", async () => {
    // Simulate error in one of the calls
    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes("/weather")) {
        return Promise.reject(new Error("Weather API failed"));
      }
      return Promise.resolve({ data: {} });
    });

    // Check if error is propagated
    await expect(fetchAllWeatherData(48.8566, 2.3522)).rejects.toThrow(
      "Weather API failed"
    );
  });
});

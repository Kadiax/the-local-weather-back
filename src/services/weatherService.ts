import axios from "axios";
import type {
  PolluantData,
  WeatherData,
  ForecastData,
} from "@/models/WeatherData";

export const fetchWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const response = await axios.get(
    `${process.env.OPENWEATHERMAP_BASE_URL as string}/weather`,
    {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHERMAP_KEY,
        units: "metric",
      },
    }
  );

  return response.data as WeatherData;
};

const fetchForecast = async (
  lat: number,
  lon: number
): Promise<ForecastData> => {
  const response = await axios.get(
    `${process.env.OPENWEATHERMAP_BASE_URL as string}/forecast`,
    {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHERMAP_KEY,
        units: "metric",
      },
    }
  );

  return response.data as ForecastData;
};

const fetchAirPollution = async (
  lat: number,
  lon: number
): Promise<PolluantData> => {
  const response = await axios.get(
    `${process.env.OPENWEATHERMAP_BASE_URL as string}/air_pollution`,
    {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHERMAP_KEY,
      },
    }
  );

  return response.data as PolluantData;
};

export const fetchAllWeatherData = async (lat: number, lon: number) => {
  const [weather, forecast, pollution] = await Promise.all([
    fetchWeather(lat, lon),
    fetchForecast(lat, lon),
    fetchAirPollution(lat, lon),
  ]);

  return { weather, forecast, pollution };
};

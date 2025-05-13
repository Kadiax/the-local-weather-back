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

  return mapToWeatherData(response.data);
};

export const fetchForecast = async (
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

  return mapToForecastData(response.data);
};

export const fetchAirPollution = async (
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

  return mapToPollutionData(response.data);
};

export const fetchAllWeatherData = async (lat: number, lon: number) => {
  const [weather, forecast, pollution] = await Promise.all([
    fetchWeather(lat, lon),
    fetchForecast(lat, lon),
    fetchAirPollution(lat, lon),
  ]);

  return { weather, forecast, pollution };
};

const mapToWeatherData = (data: any): WeatherData => {
  return {
    dt: data.dt,
    timezone: data.timezone,
    main: {
      temp: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      feels_like: data.main.feels_like,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    },
    wind: {
      speed: data.wind.speed,
    },
    weather: data.weather.map((w: any) => ({
      icon: w.icon,
      description: w.description,
    })),
    sys: {
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    },
  };
};

const mapToForecastData = (data: any): ForecastData => {
  return {
    list: data.list.map((item: any) => ({
      dt: item.dt,
      main: {
        temp: item.main.temp,
      },
      weather: item.weather.map((w: any) => ({
        icon: w.icon,
      })),
    })),
  };
};

const mapToPollutionData = (data: any): PolluantData => {
  return {
    list: data.list.map((item: any) => ({
      main: {
        aqi: item.main.aqi,
      },
      components: item.components,
    })),
  };
};

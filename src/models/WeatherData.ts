export interface WeatherData {
  dt?: number;
  currentTime?: number;
  timezone?: number;
  main?: {
    temp?: number;
    temp_max?: number;
    temp_min?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
  };
  wind?: {
    speed?: number;
  };
  weather?: {
    icon?: string;
    description?: string;
  }[];
  sys?: {
    sunrise?: number;
    sunset?: number;
    dayLength?: string;
  };
}

export interface ForecastData {
  list?: {
    dt?: number;
    main?: { temp?: number };
    weather?: {
      icon?: string;
    }[];
    currentTime?: number;
  }[];
}

export interface PolluantData {
  list?: {
    components?: Record<string, number>;
    main?: {
      aqi?: number;
    };
  }[];
}

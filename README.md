# ☁️ The Local Weather API

Backend service for The Local Weather application, providing weather data from multiple sources with built-in security and rate limiting.

🔗 **Live API** : https://the-local-weather-back.onrender.com

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express with TypeScript
- **APIs**:
  - OpenWeatherMap (weather data)
  - Mapbox (geocoding)
- **Security**:
  - API Key authentication
  - Rate limiting
  - CORS protection
- **Testing**: Jest & Supertest
- **Hosting**: Render

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- API keys for OpenWeatherMap and Mapbox

### Installation

1. Clone the repository

```bash
git clone https://github.com/kadiax/the-local-weather-back.git
cd the-local-weather-back
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

### Production Build

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Weather Data

```http
GET /weather?lat={latitude}&lon={longitude}
```

### Location Search

```http
GET /map?city={city_name}
```

### Combined Weather Data

```http
GET /weather/all?lat={latitude}&lon={longitude}
```

## 🔒 Security

- API key required for all requests
- Rate limiting: 40 requests per minutes
- CORS configured for specific origins

## 🧪 Testing

The project includes comprehensive tests for:

- API endpoints
- Service layer
- Data transformation
- Error handling

## 👨‍💻 **Contact**

- 📧 Email: kadia.toure.pro@example.com
- 💼 LinkedIn: https://www.linkedin.com/in/kadiatoure
- 🐙 GitHub: https://github.com/Kadiax

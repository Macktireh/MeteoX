# MeteoX

MeteoX is a React Native app built with Expo that provides current weather information and forecasts. The app utilizes the https://www.weatherapi.com service to fetch weather data.

## Features

- **Current Weather**: View the current weather conditions for your current location.
- **Hourly Forecast**: Get detailed hourly weather forecasts.
- **Daily Forecast**: Access a 7-day weather forecast.
- **City Search**: Search for weather information in any city around the world.
- **Persistent Storage**: Save your current location for quick access to weather updates.
- **Expiration Control**: Option to set an expiration time for location-based weather data.

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- Expo CLI: Install using `npm install -g expo-cli`
- Expo Go App: [Download Expo Go](https://expo.dev/client)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/MeteoX.git
   ```

2. Navigate to the project directory:

   ```bash
   cd MeteoX
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   expo start
   ```

5. Open the Expo Go app on your mobile device and scan the QR code displayed in the terminal.


## Configuration

1. Get your API key: Visit https://www.weatherapi.com and register for your API key.

2. Rename the `.env.example` file to `.env` and add your API key :

    ```bash
    EXPO_PUBLIC_WEATHER_API_KEY=YOUR_API_KEY
    ```

    Replace YOUR_API_KEY with the actual API key you obtained from https://www.weatherapi.com.


## Usage

- Launch the app on your mobile device using Expo Go.
- Allow location access for accurate weather information.
- Explore the various features such as current weather, hourly and daily forecasts, and city search.


## Contributing

Feel free to contribute to MeteoX! You can open issues, submit pull requests, or provide suggestions for improvement.


## License

This project is licensed under the [MIT License](LICENSE).
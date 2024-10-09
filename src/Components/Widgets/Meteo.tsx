import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

import { radius } from '../../Constants/Math'

const WidgetsScreen = () => {
    const cityName = 'Paris';
    const [weatherData, setWeatherData] = useState(null);

    const KelvinToCelsius = (kelvin: number) => {
        return (kelvin - 273.15).toFixed(0);
    };
    const apiKey = '27b5a8c70a767f29e1056253e81b7c64';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const getWeatherDataByCity = async (cityName: string) => {
      try {
        const response = await axios.get(`${apiUrl}?q=${cityName}&appid=${apiKey}`);

        if (response.status !== 200) {
          throw new Error(`Réponse HTTP ${response.status} ${response.statusText}`);
        }

        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques : ', error.message);
        throw error;
      }
    };


    useEffect(() => {
        getWeatherDataByCity(cityName)
          .then(data => setWeatherData(data))
          .catch(error => console.error(error));
      }, [cityName]);

      return (
        <View style={MeteoStyles.container}>
          <Text style={[MeteoStyles.title, {position: 'absolute', fontSize: 36, top: 10, left: 20}]}>{cityName}</Text>
          <View style={MeteoStyles.body}>
            {weatherData ? (
              <View>
                <Text style={MeteoStyles.infos}>{weatherData.weather[0].main}</Text>
                <Text style={MeteoStyles.infos}>{KelvinToCelsius(weatherData.main.temp)} °C</Text>
                <Text style={MeteoStyles.infos}>{weatherData.main.humidity} %</Text>
              </View>
            ) : (
              <Text>Loading...</Text>
            )}
            {weatherData && (
              <View>
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                  style={MeteoStyles.weatherIcon}
                  />
              </View>
            )}
          </View>
        </View>
      );
    };

const MeteoStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'lightblue',
    borderRadius: radius,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  infos: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});


export default WidgetsScreen;

import React, { useState, useEffect } from 'react';
import GitHubCard from '../components/GitHubCard';
import WeatherCard from '../components/WeatherCard';

function Dashboard(props) {
  const [coords, setCoords] = useState({ latitude: 51.5074, longitude: -0.1278 }); // Default London
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    let didCancel = false; // prevent state updates after unmount

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!didCancel) {
            setCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          if (!didCancel) setLoadingLocation(false); // fallback to default
        },
        { timeout: 10000 } // 10 seconds timeout to avoid hanging
      );
    } else {
      console.warn('Geolocation not supported');
      setLoadingLocation(false);
    }

    return () => {
      didCancel = true;
    };
  }, []); // run only once

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {loadingLocation ? (
          <div className="rounded-2xl p-8 shadow-lg flex justify-center items-center min-h-[300px] bg-gray-100 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <WeatherCard
            latitude={coords.latitude}
            longitude={coords.longitude}
            isDarkMode={props.isDarkMode}
          />
        )}

        <GitHubCard
          username="gihozo-elyse"
          isDarkMode={props.isDarkMode}
        />
      </div>
    </div>
  );
}

export default Dashboard;

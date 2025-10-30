import React from 'react'


function WeatherCard({ latitude = 51.5074, longitude = -0.1278, isDarkMode }) {
  const [weatherData, setWeatherData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [currentTime, setCurrentTime] = React.useState('')

  React.useEffect(function() {
    function updateTime() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      const displayMinutes = minutes < 10 ? '0' + minutes : minutes
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    return function() {
      clearInterval(timeInterval)
    }
  }, [])

  React.useEffect(function() {
    function fetchWeatherData() {
      setLoading(true)
      setError(null)
      
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Failed to fetch weather data')
          }
          return response.json()
        })
        .then(function(data) {
          setWeatherData(data.current_weather)
          setLoading(false)
        })
        .catch(function(err) {
          setError(err.message)
          setLoading(false)
        })
    }

    // Call the fetch function
    fetchWeatherData()
  }, [latitude, longitude])

  
  function getWeatherDescription(code) {
    if (code === 0) return 'Clear sky'
    if (code <= 3) return 'Partly cloudy'
    if (code <= 48) return 'Foggy'
    if (code <= 67) return 'Rainy'
    if (code <= 77) return 'Snowy'
    if (code <= 82) return 'Rain showers'
    if (code <= 86) return 'Snow showers'
    return 'Thunderstorm'
  }

  
  if (loading) {
    return (
      <div className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Current Weather</h2>
        <p className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Loading...</p>
      </div>
    )
  }

  
  if (error) {
    return (
      <div className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Current Weather</h2>
        <p className={`text-center py-8 ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>Error: {error}</p>
      </div>
    )
  }

 
  return (
    <div className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-500'
      }`}>Current Weather</h2>
      
      <div className="flex flex-col items-center gap-6">
      
        <div className="w-24 h-24">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-full h-full text-amber-400" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 4.636M12 7a5 5 0 100 10 5 5 0 000-10z" 
    />
  </svg>
  
</div>

        
        <div className={`text-6xl md:text-7xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {Math.round(weatherData.temperature)}°
        </div>

        
        <div className="w-full flex flex-col gap-3">
          <div className={`flex justify-between py-2 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <span className={`font-semibold ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>Condition:</span>
            <span className={`font-medium ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {getWeatherDescription(weatherData.weathercode)}
            </span>
          </div>
          
          <div className={`flex justify-between py-2 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <span className={`font-semibold ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>Wind:</span>
            <span className={`font-medium ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {Math.round(weatherData.windspeed)} mph
            </span>
          </div>
          
          <div className={`flex justify-between py-2 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <span className={`font-semibold ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>Time:</span>
            <span className={`font-medium ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

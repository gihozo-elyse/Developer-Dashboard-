import React from 'react'


function WeatherCard(props) {
  
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

      const latitude = props.latitude || 51.5074
      const longitude = props.longitude || -0.1278
      
      
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

   
    fetchWeatherData()
  }, [props.latitude, props.longitude])

  
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
        props.isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          props.isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Current Weather</h2>
        <p className={`text-center py-8 ${
          props.isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Loading...</p>
      </div>
    )
  }

 
  if (error) {
    return (
      <div className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        props.isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          props.isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Current Weather</h2>
        <p className={`text-center py-8 ${
          props.isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>Error: {error}</p>
      </div>
    )
  }

  
  return (
    <div className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      props.isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        props.isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>Current Weather</h2>
      
      <div className="flex flex-col items-center gap-6">
        
        <div className="w-24 h-24">
          <svg 
            className="w-full h-full text-amber-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" />
            <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" />
            <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" />
            <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" />
          </svg>
        </div>

       
        <div className={`text-6xl md:text-7xl font-bold ${
          props.isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {Math.round(weatherData.temperature)}°
        </div>

        
}

export default WeatherCard

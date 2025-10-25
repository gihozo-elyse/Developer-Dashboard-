import React from 'react'
import GitHubCard from '../components/GitHubCard'
import WeatherCard from '../components/WeatherCard'


function Dashboard(props) {
  return (
    <div className="w-full">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        
        <WeatherCard
          latitude={51.5074}
          longitude={-0.1278}
          isDarkMode={props.isDarkMode}
        />

        
        <GitHubCard
          username="gihozo-elyse"
          isDarkMode={props.isDarkMode}
        />
      </div>
    </div>
  )
}

export default Dashboard

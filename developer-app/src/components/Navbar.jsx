import React from 'react'


function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <nav className={`px-6 py-6 border-b-2 shadow-md ${
      isDarkMode 
        ? 'border-gray-700 shadow-black/30' 
        : 'border-gray-300 shadow-black/10'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
       
        <h1 className={`text-3xl md:text-4xl font-bold ${
          isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
        }`}>
          Developer Dashboard
        </h1>
        
       
        <button 
          onClick={toggleTheme}
          className={`px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' 
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

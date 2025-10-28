import React from 'react'

function GitHubCard({ username = 'gihozo-elyse', isDarkMode }) {
  
  const [userData, setUserData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    function fetchGitHubData() {
      setLoading(true)
      setError(null)

      fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if (!response.ok) throw new Error('User not found')
          return response.json()
        })
        .then(data => {
          setUserData(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }

    fetchGitHubData()
  }, [username])

  const cardClasses = `rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
    isDarkMode ? 'bg-gray-800 shadow-black/30' : 'bg-white shadow-black/10'
  }`

  const titleClasses = `text-2xl font-bold mb-6 ${
    isDarkMode ? 'text-gray-100' : 'text-gray-900'
  }`

  if (loading) {
    return (
      <div className={cardClasses}>
        <h2 className={titleClasses}>GitHub</h2>
        <p className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cardClasses}>
        <h2 className={titleClasses}>GitHub</h2>
        <p className={`text-center py-8 ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className={cardClasses}>
      <h2 className={titleClasses}>GitHub</h2>
      
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="flex-shrink-0">
          <img 
            src={userData.avatar_url} 
            alt={userData.name || userData.login}
            className={`w-28 h-28 md:w-32 md:h-32 rounded-full border-4 object-cover ${
              isDarkMode ? 'border-yellow-400' : 'border-yellow-600'
            }`}
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto md:ml-8">
          {[ 
            { label: 'Repos', value: userData.public_repos },
            { label: 'Followers', value: userData.followers },
            { label: 'Following', value: userData.following }
          ].map((item, index) => (
            <div key={index} className="text-center min-w-[80px]">
              <p className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>{item.value}</p>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GitHubCard

# Developer Dashboard

A modern, responsive Developer Dashboard built with React that displays real-time data from GitHub and weather APIs. Features a beautiful Light/Dark mode toggle for enhanced user experience.

## Description

This Developer Dashboard is a single-page application that helps developers track important information at a glance. It fetches and displays:
- **GitHub Profile Data**: Shows your repositories, followers, and following count with your profile avatar
- **Current Weather**: Displays real-time weather information including temperature, conditions, wind speed, and current time

The dashboard features a smooth Light/Dark mode toggle that persists your preference using localStorage.

## APIs Used

### 1. GitHub API
- **Endpoint**: `https://api.github.com/users/[username]`
- **Purpose**: Fetches user profile data including repositories, followers, and following count
- **No API Key Required**: Public API with rate limiting

### 2. Open-Meteo Weather API
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Purpose**: Provides current weather data including temperature, wind speed, and weather conditions
- **No API Key Required**: Free public API

## Technologies Used

- **React 19.1.1**: JavaScript library for building user interfaces
- **Tailwind CSS 4.1.14**: Utility-first CSS framework for styling
- **Vite 7.1.7**: Fast build tool and development server
- **Fetch API**: For making HTTP requests to external APIs
- **React Hooks**: useState and useEffect for state management
- **LocalStorage**: For persisting theme preferences

## Features

- ✅ Real-time GitHub profile data fetching
- ✅ Current weather information with live time updates
- ✅ Light/Dark mode toggle with persistent theme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Clean, modern UI with smooth animations
- ✅ Component-based architecture with props
- ✅ Reusable components

## Project Structure

developer-app/
- ├── src/
- │   ├── components/
- │   │   ├── Navbar.jsx         
- │   │   ├── GitHubCard.jsx    
- │   ├── pages/
- │   │   └── Dashboard.jsx       
- │   ├── App.jsx                
- │   ├── main.jsx               
- │   └── index.css              
- ├── public/                     
- ├── index.html                  
- ├── package.json                
- ├── vite.config.js           
- └── README.md                

## Installation & Setup

### Prerequisites
- Node.js (version 18.18 or higher)
- npm or yarn package manager

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd developer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```



``



### Light Mode
![Dashboard Light Mode](./screenshots/light-mode.png)

### Dark Mode
![Dashboard Dark Mode](./screenshots/dark-mode.png)

*

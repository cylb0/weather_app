import { useEffect, useState } from 'react'
import './App.css'
import { City, ForecastData } from './types'
import LocationDisplay from './assets/components/LocationDisplay'
import LocationSelect from './assets/components/LocationSelect'

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
const weatherApiUrl = 'http://api.weatherapi.com/v1'
const forecastUri = '/forecast.json'
const forecastDays = 5

function App() {

  const [location, setLocation] = useState<City | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData| null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchData = async () => {
      if (location && location.latitude && location.longitude) {
        try {
          setLoading(true)

          const response = await fetch(`${weatherApiUrl}${forecastUri}?key=${weatherApiKey}&q=${location.latitude},${location.longitude}&days=${forecastDays}`)
          if (!response) {
            throw new Error('No result')
          }

          const data = await response.json()

          console.log('data fetched : ' + JSON.stringify(data))

          setForecastData(data)
          setLoading(false)
        } catch (error: any) {
          setError(error.message)
        }
      }
    }

    fetchData()

    setLoading(true)
  }, [location])

  const handleLocationSelect: (city:City) => void = (city) => {
    setLocation(city)
  }

  return (
    <>
      <LocationSelect onLocationSelect={handleLocationSelect} />
      {forecastData?.current && forecastData?.location && location?.name && <LocationDisplay city={location.name} location={forecastData.location} current={forecastData.current}/>}
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import Location from './assets/components/Location'
import { City, WeatherRealtimeData } from './types'
import LocationDisplay from './assets/components/LocationDisplay'

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
const weatherApiUrl = 'http://api.weatherapi.com/v1'
const currentUri = '/current.json'

function App() {

  const [location, setLocation] = useState<City | null>(null)
  const [data, setData] = useState<WeatherRealtimeData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchData = async () => {
      if (location && location.latitude && location.longitude) {
        try {
          setLoading(true)

          const response = await fetch(`${weatherApiUrl}${currentUri}?key=${weatherApiKey}&q=${location.latitude},${location.longitude}`)
          if (!response) {
            throw new Error('No result')
          }

          const data = await response.json()

          console.log('data fetched : ' + JSON.stringify(data))

          setData(data)
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
      <Location onLocationSelect={handleLocationSelect} />
      <LocationDisplay data={data}/>
    </>
  )
}

export default App

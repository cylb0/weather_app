import { useState } from 'react'
import './App.css'
import Location from './assets/components/Location'
import { City } from './types'

function App() {

  const [location, setLocation] = useState<City | null>(null)

  const handleLocationSelect: (city:City) => void = (city) => {
    setLocation(city)
  }

  return (
    <>
      <Location onLocationSelect={handleLocationSelect} />
    </>
  )
}

export default App

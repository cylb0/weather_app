import { FC, useEffect, useState } from "react";
import { City } from "../../types";
import LocationResults from "./LocationResults";

interface LocationProps {
    onLocationSelect: (city: City) => void
}

const apiNinjaKey = import.meta.env.VITE_API_NINJAS_KEY

const Location:FC<LocationProps> = ({onLocationSelect}) => {

    const [location, setLocation] = useState<string>('')
    const [data, setData] = useState<City[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (location.length >= 3) {
                try {
                    const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${location}`, {
                        method: 'GET',
                        headers: {
                            'X-Api-Key': apiNinjaKey
                        }
                    })
                    if (!response.ok) {
                        throw new Error('No result')
                    }
                    const data = await response.json()
                    setData(data)
                } catch (error: any) {
                    setError(error.message)
                }
            }
        }

        fetchData()

    }, [location])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLocation(value)
    }

    const handleClick = (city: City) => {
        onLocationSelect(city)
        setData(null)
    }

    return (
        <>
            <form>
                <label htmlFor="location">Select a location</label>
                <input type="text" id="location" onChange={handleChange}></input>
                {location && <LocationResults results={data} onClick={handleClick} />}
                {error && <span>{error}</span>}
            </form>
        </>
    )
}

export default Location
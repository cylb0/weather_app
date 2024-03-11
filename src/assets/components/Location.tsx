import { FC, useEffect, useRef, useState } from "react";
import { City } from "../../types";
import LocationResults from "./LocationResults";

interface LocationProps {
    onLocationSelect: (city: City) => void
}

const apiNinjaKey = import.meta.env.VITE_API_NINJAS_KEY
const apiUrl = "https://api.api-ninjas.com/v1/geocoding?city="

const Location:FC<LocationProps> = ({onLocationSelect}) => {

    const [location, setLocation] = useState<string>('')
    const [data, setData] = useState<City[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const timeoutRef = useRef<number | null>(null)

    const fetchData = async (location: string) => {
        if (location.length >= 3) {
            setIsLoading(true)
            console.log('starts fetching')
            try {
                const response = await fetch(apiUrl + location, {
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
                setIsLoading(false)
            } catch (error: any) {
                setError(error.message)
            }
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (e.target.value.length < location.length) {
            setData(null)
        }
        setLocation(value)
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(() => {
            fetchData(value)
        }, 500)
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
                {isLoading && <p>Loading</p>}
                {location && <LocationResults results={data} onClick={handleClick} />}
                {error && <span>{error}</span>}
            </form>
        </>
    )
}

export default Location
import { FC, useRef, useState } from "react";
import { City } from "../../types";
import LocationResults from "./LocationResults";

interface LocationProps {
    onLocationSelect: (city: City) => void
}

const apiNinjaKey = import.meta.env.VITE_API_NINJAS_KEY
const apiUrl = "https://api.api-ninjas.com/v1/geocoding?city="

const Location:FC<LocationProps> = ({onLocationSelect}) => {

    const [data, setData] = useState<City[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const timeoutRef = useRef<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const fetchData = async (location: string) => {
        if (location.length >= 3) {
            setIsLoading(true)
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
        if (inputRef.current?.value?.length && e.target.value.length < inputRef.current?.value.length) {
            setData(null)
        }
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
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <>
            <form className="flex w-full gap-1">
                <label 
                    className="text-gray-500" 
                    htmlFor="location">Select a location</label>
                <input 
                    className="border border-gray-500 rounded px-1" 
                    ref={inputRef} 
                    type="text" 
                    id="location" 
                    onChange={handleChange}></input>
            </form>
            {location && <LocationResults results={data} onClick={handleClick} />}    
            {isLoading && <p>Loading</p>}
            {error && <span>{error}</span>}
        </>
    )
}

export default Location
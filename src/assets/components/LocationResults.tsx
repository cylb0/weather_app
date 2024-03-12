import { FC } from "react"
import { City } from "../../types";

interface LocationResultsProps {
    results: City[] | null
    onClick: (city:City) => void
}

const LocationResults:FC<LocationResultsProps> = ({results, onClick}) => {

    const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index') ?? '0')
        if (results) {
            onClick(results[index])
        }
    }

    return (
        <div className="flex flex-col">
            {results && results.map((city, index) => (
                <div className="flex gap-1 items-baseline border border-gray-500 border-collapse bg-white sm:w-1/5 w-full rounded" 
                    key={index} 
                    onClick={handleClick} 
                    data-index={index}>
                    <span className="text-gray-700">{city.name}</span>
                    <span className="text-gray-500 text-xs">{`${city.latitude.toFixed(2)}°, ${city.longitude.toFixed(2)}°`}</span>
                    <span className="text-gray-700 text-sm">{city.country}</span>
                </div>
            ))}
        </div>
    )
}

export default LocationResults
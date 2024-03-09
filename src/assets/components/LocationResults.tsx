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
        <div>
            {results && results.map((city, index) => (
                <div key={index} onClick={handleClick} data-index={index}>
                    <span>{city.name}</span>
                    <span>{city.latitude}</span>
                    <span>{city.longitude}</span>
                    <span>{city.country}</span>
                </div>
            ))}
        </div>
    )
}

export default LocationResults
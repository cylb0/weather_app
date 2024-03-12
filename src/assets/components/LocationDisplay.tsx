import { FC } from "react"
import { CurrentWeatherData, LocationData } from "../../types"
import WeatherIcon from "./WeatherIcon"

interface LocationDisplayPropos {
    location: LocationData
    current: CurrentWeatherData
}

const LocationDisplay:FC<LocationDisplayPropos> = ({location, current}) => {
    return (
        <div className="border border-gray-500 rounded text-center items-center w-3/4 mt-3 mx-auto">
            <p className="flex gap-3 justify-center align-bottom">
                <span className="text-gray-700 text-xl font-bold">{location.name}</span>
                <span className="text-gray-500 text-sm">{`${location.lat}°,${location.lon}°`}</span>
            </p>
            <div className="flex justify-center items-center">
                {current?.condition?.icon && <WeatherIcon url={current.condition.icon}/>}
                <p className="ms-3 text-gray-500 text-4xl">{`${current.temp_c}°`}</p>
            </div>
            <p className="text-gray-700 text-base">{current.condition.text}</p>
        </div>
    )
}

export default LocationDisplay
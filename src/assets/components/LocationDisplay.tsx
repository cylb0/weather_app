import { FC } from "react"
import { CurrentWeatherData, LocationData } from "../../types"
import WeatherIcon from "./WeatherIcon"
import { useTemperatureScale } from "../context/TemperatureScaleContext"

interface LocationDisplayPropos {
    city: string
    location: LocationData
    current: CurrentWeatherData
}

const LocationDisplay:FC<LocationDisplayPropos> = ({city, location, current}) => {

    const {scale} = useTemperatureScale()

    return (
        <div className="border border-gray-500 rounded text-center items-center w-3/4 mt-3 mx-auto">
            <p className="flex gap-3 justify-center align-bottom">
                <span className="text-gray-700 text-xl font-bold">{city}</span>
                <span className="text-gray-500 text-sm">{`${location.lat}°,${location.lon}°`}</span>
            </p>
            <div className="flex justify-center items-center">
                {current?.condition?.icon && <WeatherIcon url={current.condition.icon}/>}
                <p className="ms-3 text-gray-500 text-4xl">{scale === '°C' ? `${current.temp_c}°C` : `${current.temp_f}°F`}</p>
            </div>
            <p className="text-gray-700 text-base">{current.condition.text}</p>
        </div>
    )
}

export default LocationDisplay
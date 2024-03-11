import { FC } from "react"
import { WeatherRealtimeData } from "../../types"
import WeatherIcon from "./WeatherIcon"

interface LocationDisplayPropos {
    data: WeatherRealtimeData
}

const LocationDisplay:FC<LocationDisplayPropos> = ({data}) => {
    return (
        <div className="border border-gray-500 rounded text-center items-center w-1/2 mt-3 mx-auto">
            <p className="flex gap-3 justify-center align-bottom">
                <span className="text-gray-700 text-xl font-bold">{data.location.name}</span>
                <span className="text-gray-500 text-sm">{`${data.location.lat}°,${data.location.lon}°`}</span>
            </p>
            <div className="flex justify-center items-center">
                {data?.current?.condition?.icon && <WeatherIcon url={data.current.condition.icon}/>}
                <p className="ms-3 text-gray-500 text-4xl">{`${data.current.temp_c}°`}</p>
            </div>
            <p className="text-gray-700 text-base">{data.current.condition.text}</p>
            
        </div>
    )
}

export default LocationDisplay
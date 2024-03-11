import { FC } from "react"
import { WeatherRealtimeData } from "../../types"

interface LocationDisplayPropos {
    data: WeatherRealtimeData
}

const LocationDisplay:FC<LocationDisplayPropos> = ({data}) => {
    return (
        <>
            <p>{data.location.name}</p>
            <p>{data.current.temp_c}</p>
            <p>{data.current.condition.text}</p>
            <p>{`${data.location.lat}° ${data.location.lon}°`}</p>
        </>
    )
}

export default LocationDisplay
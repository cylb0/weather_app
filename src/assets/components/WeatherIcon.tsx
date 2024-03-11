import { FC } from "react"

interface WeatherIconProps {
    url: string
}

const WeatherIcon: FC<WeatherIconProps> = ({url}) => {
    return <div className="flex justify-center items-center">
        <img className="items-center" src={url} />
    </div>
}

export default WeatherIcon
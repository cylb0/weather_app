import { FC, MouseEvent } from "react";
import { useTemperatureScale } from "../context/TemperatureScaleContext";

interface TemperatureScaleSelectProps {
}

const TemperatureScaleSelect: FC<TemperatureScaleSelectProps> = () => {

    const {scale, toggleScale} = useTemperatureScale()

    const handleClick = () => {
        toggleScale()
    }

    return <button 
        className="border border-gray-700 border-1 rounded px-1"
        onClick={handleClick}>{scale}</button>
}

export default TemperatureScaleSelect
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { TemperatureScale } from "../../types";

interface TemperatureScaleContextType {
    scale: TemperatureScale
    setScale: (scale: TemperatureScale) => void
    toggleScale: () => void
}

const TemperatureScaleContext = createContext<TemperatureScaleContextType>({
    scale: '°F',
    setScale: () => {},
    toggleScale: () => {}
})

export const useTemperatureScale = () => useContext(TemperatureScaleContext)

export const TemperatureScaleProvider: FC<{children: ReactNode} > = ({ children }) => {
    const [scale, setScale] = useState<TemperatureScale>('°F')

    const toggleScale = () => {
        const newScale = scale === '°C' ? '°F' : '°C'
        setScale(newScale)
    }

    return <TemperatureScaleContext.Provider value={{ scale, setScale, toggleScale }}>
        {children}
    </TemperatureScaleContext.Provider>
}
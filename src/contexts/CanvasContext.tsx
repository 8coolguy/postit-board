import { createContext, useContext, type ReactNode, type FC, useMemo } from "react";
import {type Point, type CanvasContextState} from "@lib/CanvasTypes.tsx";

const defaultState: CanvasContextState = {
    center: {x:0, y:0},
    zoom: 100
};

const CanvasContext = createContext<CanvasContextState>(defaultState);
export const useCanvasContext = ():CanvasContextState => {
    const context = useContext(CanvasContext);
    if(!context){
        console.error("Context is Wrong");
    }
    return context;
};
interface CanvasProviderProps extends CanvasContext{
    children:ReactNode
}

export const CanvasProvider:FC<CanvasProviderProps> = ({
    children,
    center,
    zoom
}) =>{
    const contextValue = useMemo(() => {
        return {center, zoom}
    }, [center, zoom]);
    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    )
}

import { createContext, useContext, type ReactNode, type FC, useMemo } from "react";
import { CursorStateType } from "@lib/CursorTypes";
import {type Point, type CanvasContextState} from "@lib/CanvasTypes.tsx";

const defaultState: CanvasContextState = {
    center: {x:0, y:0},
    zoom: 100,
    cursorState:CursorStateType.POINT,
    setCursor:1,
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
    zoom,
    cursorState,
    setCursor
}) =>{
    const contextValue = useMemo(() => {
        return {center, zoom, cursorState, setCursor}
    }, [center, zoom, cursorState, setCursor]);
    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    )
}

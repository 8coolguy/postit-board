import { createContext, useContext, type ReactNode, type FC, useMemo } from "react";

export interface Point {
    x:number;
    y:number;
}

export interface CanvasContextState{
    center:Point;
}

const defaultState: CanvasContextState = {
    center: {x:0, y:0}
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
    center
}) =>{
    const contextValue = useMemo(() => {
        return {center}
    }, [center]);
    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    )
}

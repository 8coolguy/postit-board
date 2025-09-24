import { createContext, useContext, type ReactNode, type FC, useMemo } from "react";
import {type Point } from "@lib/CanvasTypes.tsx";
import {type DraggableContextState} from "@lib/DraggableTypes.tsx";

const defaultState: DraggableContextState= {
    position: {x:0, y:0},
    size:{x:0,y:0}
};

const DraggableContext = createContext<DraggableContextState>(defaultState);
export const useDraggableContext = ():DraggableContext=> {
    const context = useContext(DraggableContext);
    if(!context){
        console.error("Context is Wrong");
    }
    return context;
};
interface DraggableProviderProps extends DraggableContext{
    children:ReactNode
}

export const DraggableProvider:FC<DraggableProviderProps> = ({
    children,
    position,
    size,
}) =>{
    const contextValue = useMemo(() => {
        return {position,size}
    }, [position, size]);
    return (
        <DraggableContext.Provider value={contextValue}>
            {children}
        </DraggableContext.Provider>
    )
}

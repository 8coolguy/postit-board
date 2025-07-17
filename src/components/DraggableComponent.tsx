'use client';
import { useState, type FC, useEffect} from "react";
import {type Point} from "framer-motion";
import { useCanvasContext } from "@contexts/CanvasContext";

const DraggableComponent: FC<Props> = ({children}) =>{
    const [dragState, setDragState] = useState(false);
    const [position, setPosition] = useState<Point>({x:100,y:0});
    const [globalPosition, setGlobalPosition] = useState<Point>({x:100,y:100})
    const { center } = useCanvasContext();

    function handlePointerDown(event){
        event.stopPropagation();
        setDragState(true);
    }
    function handlePointerUp(event){
        if(dragState){
            event.stopPropagation();
            setDragState(false);
        }
    }

    function handlePointerMove(event){
        if(dragState){
            event.stopPropagation();
            setPosition({x:event.clientX, y:event.clientY});
        }
    }

    useEffect(() => {
        console.log("DraggableComponent", center);
    }, [center])
    

    return (
        <div 
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{top:`${position.y}px`, left:`${position.x}px`, transform: "translate(-50%, -50%)"}}
        className="absolute z-1">
            {children}
        </div>
    )
}

export default DraggableComponent;

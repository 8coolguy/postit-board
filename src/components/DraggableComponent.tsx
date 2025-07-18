'use client';
import { useState, type FC, useEffect} from "react";
import {type Point} from "framer-motion";
import { useCanvasContext } from "@contexts/CanvasContext";
import useWindowSize from "@hooks/useWindowSize";

const DraggableComponent: FC<Props> = ({children}) =>{
    const [dragState, setDragState] = useState(false);
    const [visibilityStatus, setVisibility] = useState("hidden");
    const [position, setPosition] = useState<Point>({x:0,y:0});
    const { center, zoom } = useCanvasContext();
    const { width, height } = useWindowSize();

    function handlePointerDown(event){
        event.stopPropagation();
        setDragState(true);
        if (Math.sqrt(Math.sqrt(Math.pow(center.x-position.x,2) + Math.pow(center.y-position.y,2))) > 24){
            setVisibility("hidden");
        }else{
            setVisibility("");
        }
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
            setPosition({x:event.clientX + center.x-width/2, y:event.clientY+center.y-height/2});
        }
    }

    

    useEffect(() => {
        if (Math.sqrt(Math.sqrt(Math.pow(center.x-position.x,2) + Math.pow(center.y-position.y,2))) > 24){
            setVisibility("hidden");
        }else{
            setVisibility("");
        }
        console.log("position",position);
        console.log("center",center);
        console.log(visibilityStatus);
    }, [center])
    if (width === undefined|| height === undefined) { 
        return <div style={{ visibility: 'hidden' }}>Loading responsive content...</div>;
    }
    return (
        <div 
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{top:`${position.y - center.y + height/2}px`, left:`${position.x - center.x + width/2}px`, transform: "translate(-50%, -50%)"}}
        className={`absolute z-1 ${visibilityStatus}`}>
            {children}
        </div>
    )
}

export default DraggableComponent;

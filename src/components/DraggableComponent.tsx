'use client';
import { useState, type FC, useEffect} from "react";
import {type Point} from "framer-motion";
import { useCanvasContext } from "@contexts/CanvasContext";

const DraggableComponent: FC<Props> = ({children}) =>{
    const [dragState, setDragState] = useState(false);
    const [visibilityStatus, setVisibility] = useState("hidden");
    const [position, setPosition] = useState<Point>({x:0,y:0});
    const [inner, setInner] = useState({x:0, y:0});
    const { center, zoom } = useCanvasContext();

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
            setPosition({x:event.clientX + center.x-inner.x/2, y:event.clientY+center.y-inner.y/2});
        }
    }
    let innerHeight = 0;
    let innerWidth = 0;
    useEffect(() => {
        if(window){
            setInner({x:window.innerWidth, y:window.innerHeight});
        }
    }, [])
    

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

    useEffect(() => {
        console.log(inner);
    }, [inner])

    return (
        <div 
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{top:`${position.y - center.y + inner.x/2}px`, left:`${position.x - center.x + inner.y/2}px`, transform: "translate(-50%, -50%)"}}
        className={`absolute z-1 ${visibilityStatus}`}>
            {children}
        </div>
    )
}

export default DraggableComponent;

'use client';
import { useState, type FC} from "react";
import {type Point} from "framer-motion";

const DraggableComponent: FC<Props> = ({children}) =>{
    const [dragState, setDragState] = useState(false);
    const [position, setPosition] = useState<Point>({x:100,y:0});

    function handlePointerDown(event){
        event.stopPropagation();
        setDragState(true);
        console.log(event);
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
            console.log(event);
        }
    }

    return (
        <div 
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{top:`${position.y}px`, left:`${position.x}px`}}
        className="absolute z-1">
            {children}
        </div>
    )
}

export default DraggableComponent;

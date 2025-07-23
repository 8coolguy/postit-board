'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import { type Point } from "framer-motion";

const CursorComponent: FC<Props> = ({}) =>{
    const [dragState, setDragState] = useState(false);
    const [position, setPosition] = useState<Point>({x:0,y:0});
    function handlePointerMove(event){
        //setPosition({x:event.clientX, y:event.clientY})
    }
    function handlePointerDown(event){
        setDragState(true);
    }
    function handlePointerUp(event){
        setDragState(false);
    }
    useEffect(() => {
        if(dragState){
            document.body.style.cursor = "grabbing";
        }else if(!dragState){
            document.body.style.cursor = "default";
        }
    }, [dragState])

    return (
        <div 
        className="absolute z-1 w-full h-full" 
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        >
        </div>
    )
}
export default CursorComponent;
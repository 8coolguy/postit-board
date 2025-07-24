'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import { type Point } from "framer-motion";
const CursorStateType = {
    DRAG:0,
    POINT:1,
    EDGE:2,
    DISABLE:3,
    MOVE:4
}
const CursorComponent: FC<Props> = ({}) =>{
    const [dragState, setDragState] = useState<CursorStateType>(1);
    const [position, setPosition] = useState<Point>({x:0,y:0});
    function handlePointerMove(event){
        //setPosition({x:event.clientX, y:event.clientY})
    }
    function handlePointerDown(event){
        setDragState(0);
        //check if it is on the side of a component
    }
    function handlePointerUp(event){
        setDragState(1);
    }
    useEffect(() => {
        if(dragState == 0){
            document.body.style.cursor = "move";
        }else if(dragState == 1){
            document.body.style.cursor = "default";
        }else if (dragState == 2){
            document.body.style.cursor ="se-resize";
        }else if (dragState == 3){
            document.body.style.cursor ="not-allowed";
        }else if(dragState == 4){
            document.body.style.cursor ="grabbing";
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
'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import { type Point } from "@lib/CanvasTypes.tsx";
import { CursorStateType } from "@lib/CursorTypes.tsx";
const CursorComponent: FC<Props> = ({}) =>{
    const [dragState, setDragState] = useState<number>(CursorStateType.POINT);
    const [position, setPosition] = useState<Point>({x:0,y:0});
    function handlePointerMove(event){
        setPosition({x:event.clientX, y:event.clientY})
    }
    function handlePointerDown(event){
        setDragState(CursorStateType.DRAG);
    }
    function handlePointerUp(event){
        setDragState(CursorStateType.POINT);
    }
    useEffect(() => {
        if(dragState == CursorStateType.DRAG){
            document.body.style.cursor = "grabbing";
        }else if(dragState == CursorStateType.POINT){
            document.body.style.cursor = "default";
        }else if (dragState == CursorStateType.EDGE){
            document.body.style.cursor ="se-resize";
        }else if (dragState == CursorStateType.DISABLE){
            document.body.style.cursor ="not-allowed";
        }else if(dragState == CursorStateType.MOVE){
            document.body.style.cursor ="move";
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
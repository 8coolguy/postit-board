'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import { type Point } from "@lib/CanvasTypes.tsx";
import { CursorStateType } from "@lib/CursorTypes.tsx";
const CursorComponent: FC<Props> = ({cursorState}) =>{
    const [position, setPosition] = useState<Point>({x:0,y:0});

    function handlePointerMove(event){
        setPosition({x:event.clientX, y:event.clientY})
    }

    return (
        <div 
        className="absolute z-2 w-full h-full" 
        >
        </div>
    )
}
export default CursorComponent;
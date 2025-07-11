'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import {type Point} from "framer-motion"

interface Props {
  children: React.ReactNode;
}
const Dots = ({zoom}:{zoom:number}) => {
    const pixelSize = Math.round(-.16 * zoom + 58);
    return (
        <div style={{backgroundSize: `${pixelSize}px ${pixelSize}px`}} className={`absolute inset-0 h-full w-full bg-[radial-gradient(#776780_1.5px,transparent_1px)] opacity-40 [background-size:$${pixelSize}px_${pixelSize}px]`}></div>
    );
}

const Canvas: FC <Props> = ({children}) => {
    const canvasHeight = 3000;
    const canvasWidth = 3000;

    const centerY = 0;
    const centerX = 0;
    const upperLimit = 50;
    const lowerLimit = 300;
    const [center, setCenter] = useState<Point>({x:centerX,y:centerY});
    const [offSet,setOffset] = useState<Point>({
        x:0,
        y:0,
    }); 
    const [zoom, setZoom] = useState(100);
    const wheelSens = .05;
    const [dragState, setDragState] = useState(false);
    //TODO:
    //pointer events that I have to handle
    //handle pointer down, pointer move, pointer up, wheel scroll events

    function handlePointerDown(event: PointerEvent){
        setDragState(true);
        setOffset({x:event.clientX,y:event.clientY});
    }

    function handlePointerUp(event: PointerEvent){
        setDragState(false);
        console.log("center",center);
    }
    function handlePointerMove(event: PointerEvent){
        if(dragState){
            const delta = {x:offSet.x - event.clientX, y: offSet.y - event.clientY};
            //handle case where center moves off the can
            if(canvasWidth < Math.abs(center.x + delta.x) || canvasHeight < Math.abs(center.y + delta.y))
                return;
            setCenter({x:center.x + delta.x, y:center.y + delta.y});
        }
    }
    function handleWheel(event:MouseEvent){
        if(event.deltaY > 0){
            setZoom(Math.max(zoom - event.deltaY*wheelSens, upperLimit));
        }
        else if(event.deltaY < 0){
            setZoom(Math.min(zoom - event.deltaY*wheelSens, lowerLimit));
        }
    }

    useEffect(() => {
    }, [center])

    useEffect(() => {
        if(dragState){
            document.body.style.cursor = "grabbing";
        }else if(!dragState){
            document.body.style.cursor = "default";
        }
    }, [dragState])

    useEffect(() => {
        console.log("Offset", offSet);
    }, [offSet])
     
    return (
        <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleWheel}
        >
            <Dots zoom={zoom}/>
        </div>
    )

}



export default Canvas;

'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import {type Point} from "framer-motion"

interface Props {
  children: React.ReactNode;
}
const Dots = ({zoom}:{zoom:number}) => {
    const pixelSize = Math.round(-.16 * zoom + 58);
    console.log(pixelSize)
    return (
        <div style={{backgroundSize: `${pixelSize}px ${pixelSize}px`}}className={`absolute inset-0 h-full w-full bg-[radial-gradient(#776780_1.5px,transparent_1px)] opacity-40 [background-size:$${pixelSize}px_${pixelSize}px]`}></div>
    );
}

const Canvas: FC <Props> = ({children}) => {
    const canvasHeight = 3000;
    const canvasWidth = 3000;

    const centerH = 1500;
    const centerW = 1500;
    const upperLimit = 50;
    const lowerLimit = 300;

    const [offSet,setOffset] = useState<Point>({
        x:-centerW,
        y:-centerH,
    }); 
    const [zoom, setZoom] = useState(100);
    const wheelSens = .05;
    const [dragState, setDragState] = useState(false);
    //TODO:
    //pointer events that I have to handle
    //handle pointer down, pointer move, pointer up, wheel scroll events

    function handlePointerDown(event: PointerEvent){
        setDragState(true);
    }
    function handlePointerUp(event: PointerEvent){
        setDragState(false);
    }
    function handlePointerMove(event: PointerEvent){
        if(dragState){
            console.log(event);
        }
    }
    function handleWheel(event:MouseEvent){
        if(event.deltaY > 0){
            setZoom(Math.max(zoom - event.deltaY*wheelSens, upperLimit));
        }
        else if(event.deltaY < 0){
            setZoom(Math.min(zoom - event.deltaY*wheelSens, lowerLimit));
        }
        console.log("Zoom Change");
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

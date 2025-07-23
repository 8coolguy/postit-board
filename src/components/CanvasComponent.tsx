'use client'
import React, { type FC, useEffect, useCallback, useState } from "react";
import {type Point} from "framer-motion"
import { CanvasProvider } from "@contexts/CanvasContext.tsx"

interface Props {
  children: React.ReactNode;
}
const Dots = ({position,zoom}:{position:Point,zoom:number}) => {
    const pixelSize = Math.round(-.16 * zoom + 58);
    return (
        <div style={{backgroundSize: `${pixelSize}px ${pixelSize}px`, backgroundPosition: `${-position.x*.07}px ${-position.y*.07}px`}} className={`absolute inset-0 h-full w-full bg-[radial-gradient(#776780_1.5px,transparent_1px)] opacity-100 [background-size:$${pixelSize}px_${pixelSize}px]`}></div>
    );
}
const Filter = () => (
  <div className="pointer-events-none absolute inset-0 hidden h-full w-full bg-noise opacity-100 brightness-[105%] contrast-[170%] filter sm:inline" />
);

const Canvas: FC <Props> = ({children}) => {
    const canvasHeight = 10000;
    const canvasWidth = 10000;
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

    function handlePointerDown(event: PointerEvent){
        const pixelSize = Math.round(.16 * zoom + 58);
        setDragState(true);
        setOffset({x:event.clientX*pixelSize/1000,y:event.clientY*pixelSize/1000});
    }

    function handlePointerUp(event: PointerEvent){
        setDragState(false);
    }

    function handlePointerMove(event: PointerEvent){
        if(dragState){
            const pixelSize = Math.round(.16 * zoom + 58);
            const delta = {x:offSet.x - event.clientX*pixelSize/1000, y: offSet.y - event.clientY*pixelSize/1000};
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

    function handleKeyBoardEvent(event){
        const delta = {x:0, y:0};
        if(event.code == "ArrowDown"){
            delta.y = 10
        }
        else if(event.code == "ArrowUp"){
            delta.y = -10
        }
        else if(event.code == "ArrowRight"){
            delta.x = 10
        }
        else if(event.code == "ArrowLeft"){
            delta.x = -10
        }
        if(canvasWidth < Math.abs(center.x + delta.x) || canvasHeight < Math.abs(center.y + delta.y))
            return;
        setCenter({x:center.x + delta.x, y:center.y + delta.y});
    }

    useEffect(() => {
    }, [center])

    useEffect(() => {
    }, [dragState])

    useEffect(() => {
        console.log(offSet);
    }, [offSet])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyBoardEvent);
      return () => {
        document.removeEventListener('keydown', handleKeyBoardEvent);
      }
    }, [center])
    
     
    return (
        <CanvasProvider
            center={center}
            zoom={zoom}
        >
            <div
                className="z-0"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onWheel={handleWheel}
            >
                {children}
                <Dots position={center} zoom={zoom}/>
                <Filter/>
            </div>
        </CanvasProvider>
    )

}



export default Canvas;

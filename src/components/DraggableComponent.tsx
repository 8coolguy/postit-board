'use client';
import { useState, type FC, useEffect} from "react";
import {type Point} from "@lib/CanvasTypes.tsx";
import { useCanvasContext } from "@contexts/CanvasContext";
import { CursorStateType } from "@lib/CursorTypes";
import useWindowSize from "@hooks/useWindowSize";

const DraggableComponent: FC<Props> = ({children}) =>{
    const [dragState, setDragState] = useState(false);
    const [visibilityStatus, setVisibility] = useState("hidden");
    const [position, setPosition] = useState<Point>({x:0,y:0});
    const { center, zoom, setCursor } = useCanvasContext();
    const { width, height } = useWindowSize();
    // const [size, setSize] = useState<Point>({x:300,y:300});
    const size = -.4 * zoom + 220;

    function handlePointerDown(event){
        // do no need to set visibility when the dragging component due to the fact that you can not move the cursor to a part of the screen you can not see
        event.stopPropagation();
        const deltaCenter = {x:position.x - center.x + width/2 - event.clientX, y:position.y - center.y + height/2 - event.clientY};
        let left = (deltaCenter.x > size*.4);
        let right = (deltaCenter.x < size * -.4);
        let up = (deltaCenter.y > size*.4);
        let down = (deltaCenter.y < size * -.4);
        if(left && up){
            //change the size of the component diagonally from the cursor to the other three boundraies i think
            setCursor(CursorStateType.EDGELU);
        }else if(right && down){
            setCursor(CursorStateType.EDGERD);
        }else if(left && down){
            setCursor(CursorStateType.EDGELD);
        }else if(right && up){
            setCursor(CursorStateType.EDGERU);
        }
        else if(left){
            setCursor(CursorStateType.EDGER);
        }
        else if(right){
            setCursor(CursorStateType.EDGER);
        }
        else if(up){
            setCursor(CursorStateType.EDGEU);
        }
        else if(down){
            setCursor(CursorStateType.EDGEU);
        }else{
            setCursor(CursorStateType.DRAG);
            setDragState(true);
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
        //need to change this function to actually take into account screen size, zoom and the center
        const eucDist = Math.sqrt(Math.pow(position.x - center.x,2) + Math.pow(position.y - center.y,2),.5);
        if (eucDist > 600){
            setVisibility("hidden");
        }else{
            setVisibility("");
        }
    }, [center])

    useEffect(() => {
    }, [visibilityStatus])

    if (width === undefined|| height === undefined) { 
        return <div style={{ visibility: 'hidden' }}>Loading responsive content...</div>;
    }
    return (
        <div 
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{visibility: `${visibilityStatus}`, height:`${size}px`, width:`${size}px`, top:`${position.y - center.y + height/2}px`, left:`${position.x - center.x + width/2}px`, transform: "translate(-50%, -50%)"}}
        className={`absolute z-3 truncate border`}>
            {children}
        </div>
    )
}

export default DraggableComponent;

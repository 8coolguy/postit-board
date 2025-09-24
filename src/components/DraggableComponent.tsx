'use client';
import { useState, type FC, useEffect} from "react";
import {type Point} from "@lib/CanvasTypes.tsx";
import { useCanvasContext } from "@contexts/CanvasContext";
import { CursorStateType } from "@lib/CursorTypes";
import { DraggableProvider } from "@contexts/DraggableContext.tsx";
import useWindowSize from "@hooks/useWindowSize";

const DraggableComponent: FC<Props> = ({children, startingPosition, startingSize}) =>{
    const { width, height } = useWindowSize();
    const [dragState, setDragState] = useState(false);//handles all cursor down states for the component
    const moveMultiplier = .01;
    
    const [visibilityStatus, setVisibility] = useState("hidden");
    //position of the componenet within in the virtual canvas
    const [position, setPosition] = useState<Point>({x:0,y:0});
    console.log(position);
    //canvas context 
    const { center, zoom, cursorState, setCursor } = useCanvasContext();
    //size of the component
    const [size, setSize] = useState<Point>({x:0,y:0});
    //offset used to measure change in size
    const [offSet, setOffset] = useState<Point>({x:0,y:0});
    function adjustSize(size) {
        return -.4 * zoom + size;
    }
    function virtualSize(size){
        return size +.4 * zoom;
    }


    function handlePointerDown(event){
        // do no need to set visibility when the dragging component due to the fact that you can not move the cursor to a part of the screen you can not see
        event.stopPropagation();
        setOffset({x:event.clientX,y:event.clientY});
        const deltaCenter = {x:position.x - center.x + width/2 - event.clientX, y:position.y - center.y + height/2 - event.clientY};
        let left = (deltaCenter.x > adjustSize(size.x)*.3);
        let right = (deltaCenter.x < adjustSize(size.x) * -.3);
        let up = (deltaCenter.y > adjustSize(size.y)*.3);
        let down = (deltaCenter.y < adjustSize(size.y) * -.3);

        //change the size of the component diagonally from the cursor to the other three boundraies i think
        if(left && up){
            setCursor(CursorStateType.EDGELU);
        }else if(right && down){
            setCursor(CursorStateType.EDGERD);
        }else if(left && down){
            setCursor(CursorStateType.EDGELD);
        }else if(right && up){
            setCursor(CursorStateType.EDGERU);
        }else if(left){
            setCursor(CursorStateType.EDGEL);
        }else if(right){
            setCursor(CursorStateType.EDGER);
        }else if(up){
            setCursor(CursorStateType.EDGEU);
        }else if(down){
            setCursor(CursorStateType.EDGED);
        }else{
            setCursor(CursorStateType.DRAG);
        }
        setDragState(true);
    }

    function handlePointerUp(event){
        if(dragState){
            event.stopPropagation();
            setDragState(false);
            setCursor(CursorStateType.POINT);
        }
    }

    function handlePointerMove(event){
        let pdeltaX = event.clientX - offSet.x;
        let pdeltaY = event.clientY - offSet.y;
        if (cursorState === CursorStateType.EDGEL || cursorState === CursorStateType.EDGER) pdeltaY = 0;
        if (cursorState === CursorStateType.EDGEU || cursorState === CursorStateType.EDGED) pdeltaX = 0;
        let sdeltaX = pdeltaX;
        let sdeltaY = pdeltaY;
        if (cursorState === CursorStateType.EDGEL || cursorState === CursorStateType.EDGELU || cursorState === CursorStateType.EDGELD) sdeltaX = sdeltaX * -1;
        if (cursorState === CursorStateType.EDGEU || cursorState === CursorStateType.EDGELU || cursorState === CursorStateType.EDGERU) sdeltaY = sdeltaY * -1;

        if(cursorState != CursorStateType.POINT && cursorState != CursorStateType.DRAG && CursorStateType != CursorStateType.MOVE){
            const pixelSize = Math.round(.16 * zoom + 58);
            event.stopPropagation();
            setPosition({x:position.x + pdeltaX * moveMultiplier * pixelSize, y:position.y + pdeltaY * moveMultiplier * pixelSize});
            setSize({x:size.x + sdeltaX * moveMultiplier * pixelSize, y:size.y + sdeltaY * moveMultiplier * pixelSize});
            setOffset({x:event.clientX,y:event.clientY});
        }
        else if(dragState){
            event.stopPropagation();
            setPosition({x:event.clientX + center.x-width/2, y:event.clientY+center.y-height/2});
        }
    }

    useEffect(() => {
        //need to change this function to actually take into account screen size, zoom and the center
        // const eucDist = Math.sqrt(Math.pow(position.x - center.x,2) + Math.pow(position.y - center.y,2),.5);
        // if (eucDist > 600){
        //     setVisibility("hidden");
        // }else{
        //     setVisibility("");
        // }
    }, [center])

    useEffect(() => {
    }, [visibilityStatus])

    if (width === undefined|| height === undefined) { 
        return <div style={{ visibility: 'hidden' }}>Loading responsive conent...</div>;
    }
    return (
        <DraggableProvider position={position} size={size}>
            <div
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            style={{visibility: `${visibilityStatus}`, height:`${adjustSize(size.y)}px`, width:`${adjustSize(size.x)}px`, top:`${position.y - center.y + height/2}px`, left:`${position.x - center.x + width/2}px`, transform: "translate(-50%, -50%)"}}
            className={`absolute z-3 truncate border`}>
                {children}
            </div>
        </DraggableProvider>
    )
}

export default DraggableComponent;

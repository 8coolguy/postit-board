//CanvasTypes.tsx
export interface Point {
    x:number;
    y:number;
}

export interface CanvasContextState{
    center:Point;
    zoom:number;
    cursorState:number;
    setCursor:number;
}
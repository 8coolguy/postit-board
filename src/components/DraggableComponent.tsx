'use client';
import { useState } from "react";
export default function DraggableComponent({children}){
    const [state, setState] = useState(true);

    return (
        <div className="w-full h-full bg-amber-400" onClick={(event)=>{setState(!state); console.log("click",event);}}>
            {children}
        </div>
    )
}

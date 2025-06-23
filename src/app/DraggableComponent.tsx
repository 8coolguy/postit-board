'use client';
import { useState } from "react";
export default function DraggableComponent({children}){
    const [state, setState] = useState(true);

    return (
        <div onClick={(event)=>{setState(!state); console.log("click",event);}}>
            {children}
        </div>
    )

}

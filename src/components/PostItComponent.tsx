/*
    This component updates the db it needs the position and size from it parent component. 
    Decides what type of element it is
*/
import { useEffect, memo } from "react";
import { useDraggableContext } from "@contexts/DraggableContext.tsx"

function PostItComponent({children, type, content}){
    const {position,size} = useDraggableContext();
    return (
            <div className="">
                <p className="text-bold">{size.x}</p>
                <p className="text-bold">{position.y}</p>
            </div>
    )

}
export default PostItComponent;
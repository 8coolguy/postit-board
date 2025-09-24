/*
    This component updates the db it needs the position and size from it parent component. 
    Decides what type of element it is
*/
import { useEffect } from "react";
import { useDraggableContext } from "@contexts/DraggableContext.tsx"

fucntion PostItComponent(){
    const { size, position } = useDraggableContext();
    console.log(position);
   return (
    <div> {size.x} {size.y}</div>
   )

}
export default PostItComponent;
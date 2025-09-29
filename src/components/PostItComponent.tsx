/*
    This component updates the db it needs the position and size from it parent component. 
    Decides what type of element it is
*/
import { useEffect, memo } from "react"
import { useDraggableContext } from "@contexts/DraggableContext.tsx"
import TextComponent from "@components/TextComponent.tsx"
import ImageComponent from "@components/ImageComponent.tsx"

function PostItComponent({children, type, content, font, fontSize}){
    //border of the component is handled here and all content is handled in the component itself
    const {position,size} = useDraggableContext();
    if (type=="text")
        return (
            <TextComponent content={content} font={font} fontSize={fontSize}/>
        )
    else if(type=="image")
        return (
            <ImageComponent content={content}/>
        )
    else if(type=="shader")
        console.log("shader");
    else if(type=="youtube")
        console.log("youtube")
    else if(type=="")


    //debug one
    return (
            <div className="">
                <p className="text-bold">{size.x}</p>
                <p className="text-bold">{size.y}</p>
                <p className="text-bold">{position.x}</p>
                <p className="text-bold">{position.y}</p>
            </div>
    )

}
export default PostItComponent;
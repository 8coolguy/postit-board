/*
    This component updates the db it needs the position and size from it parent component. 
    Decides what type of element it is
*/
import { useEffect, memo } from "react"
import { useDraggableContext } from "@contexts/DraggableContext.tsx"
import TextComponent from "@components/TextComponent.tsx"
import ImageComponent from "@components/ImageComponent.tsx"
import ShaderComponent from "@components/ShaderComponent.tsx"
import VideoComponent from "@components/VideoComponent.tsx"

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
        return (
            <ShaderComponent code={content} onError={(e)=>console.error(e)} onCompile={()=>console.log("compiled")}/>
        )
    else if(type=="youtube")
        return (
            <VideoComponent content={content}/>
        )
    else if(type=="drawing")
        console.log("drawing")
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
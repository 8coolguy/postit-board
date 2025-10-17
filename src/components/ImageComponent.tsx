import { useState } from "react";

function ImageComponent({content}){
    return (
        <div>
            <img draggable="false" src={content}></img>
        </div>
    )
}
export default ImageComponent;
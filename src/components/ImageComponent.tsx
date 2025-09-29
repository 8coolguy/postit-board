import { useState } from "react";

function ImageComponent({content}){
    return (
        <div>
            <img src={content}></img>
        </div>
    )
}
export default ImageComponent;
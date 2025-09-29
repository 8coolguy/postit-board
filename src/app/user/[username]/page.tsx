'use client'
import 'remixicon/fonts/remixicon.css';
import { useState, useEffect} from "react";
import Canvas from "@components/CanvasComponent.tsx";
import DraggableComponentMemo from "@components/DraggableComponent.tsx";
import PostItComponent from "@components/PostItComponent.tsx";

export default function Home({params}){
    const [settings, setSettings] = useState({});
    const posts = [{id:0,x:900, y:0,sizeX:200,sizeY:200, title:"first post",type:"image",content:"https://picsum.photos/id/237/200/300",author:"arnav"}, {id:1,x:500, y:0,sizeX:400,sizeY:100, title:"first post",type:"text",content:"This is a postit note to tell you how cool this project is and it is so amazing you should make more like this to improve your dogshit mental",author:"arnav", font:"",fontSize:"32"}];

    const elements = posts.map(element => 
            (<DraggableComponentMemo key={element.id} startingSize={{x:element.sizeX,y:element.sizeY}} startingPosition={{x:element.x,y:element.y}} >
                <PostItComponent content={element.content} type={element.type} font={element.type} fontSize={element.fontSize}>
                </PostItComponent>
            </DraggableComponentMemo>)
        );
    function handleClick(event){
        event.stopPropagation();
    }
    useEffect(() => {
        fetchSettings();
      return () => {
      }
    }, [])
    
    async function fetchSettings(){
        const response = await fetch("/api/settings");
        const data = await response.json();
        setSettings(data);
    }
    return (
        <div>
            <Canvas>
                {elements}
            </Canvas>
            <div className="z-3 absolute top-[100px] left-[100px]">
                <button onClick={handleClick}>
                    <div className="rounded-full bg-zinc-600 hover:bg-zinc-800 opacity-70 p-4">
                        <i className="ri-add-large-line" style={{fontSize: "36px"}}></i>
                    </div>
                </button>
            </div>


            <div className="z-3 absolute bottom-[100px] right-[100px]">
                <button onClick={handleClick}>
                    <div className="rounded-full bg-zinc-600 hover:bg-zinc-800 opacity-70 p-4">
                        <i className="ri-settings-3-line" style={{fontSize: "36px"}}></i>
                    </div>
                </button>
            </div>

        </div>
    )
} 


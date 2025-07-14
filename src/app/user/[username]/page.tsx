'use client'
import Canvas from "@components/CanvasComponent.tsx";

export default function Home({params}){
    const settings = {};
    const posts = [{id:0,x:1000, y:0, title:"first post",type:"image", title:"",content:"Hello this is the the content of this posit note",author:"arnav", size:10},];

    const elements = posts.map(element => 
            (<div key={element.id} className={`fixed border-white top-[${element.y}px] left-[${element.x}px]`}>
                <p className="text-bold">{element.title}</p>
                <p className="text-bold">{element.content}</p>
            </div>)
        );
    function handleClick(event){
        event.stopPropagation();
        console.log("button",event);
    }
    return (
        <div>
            <Canvas>
                <p>this isflskdfjs</p>
            </Canvas>
            <div className="z-2 absolute">
                <button onClick={handleClick} className="z-50">Click Me</button>
            </div>
        </div>
    )
} 


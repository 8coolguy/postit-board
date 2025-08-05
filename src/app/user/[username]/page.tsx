'use client'
import Canvas from "@components/CanvasComponent.tsx";
import DraggableComponent from "@components/DraggableComponent.tsx";

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
        console.log("Hello World")
        event.stopPropagation();
        //add an event
    }
    return (
        <div>
            <Canvas>
                <DraggableComponent>
                    <p> here is some text jflksjflksjdlfkjsl</p>
                    <p>flsjflsdkjfldskjflsdkfjlsdkfjlsdkfj</p>
                    <p> here is some text jflksjflksjdlfkjsl</p>
                    <p>flsjflsdkjfldskjflsdkfjlsdkfjlsdkfj</p>
                    <p>flsjflsdkjfldskjflsdkfjlsdkfjlsdkfj</p>
                    <p> here is some text jflksjflksjdlfkjsl</p>
                    <p>flsjflsdkjfldskjflsdkfjlsdkfjlsdkfj</p>
                </DraggableComponent>
            </Canvas>
            <div className="z-3 absolute top-[100px] left-[100px]">
                <button onClick={handleClick}>Click Me</button>
            </div>
        </div>
    )
} 


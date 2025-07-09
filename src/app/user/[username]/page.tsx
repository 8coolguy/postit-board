import Canvas from "@components/CanvasComponent.tsx";

export async function generateStaticParams() {
    const users = [{username:"c", title:"1"},{username:"b",title:"2"},{username:"a",title:"3"}];
    return users.map((user)=>({slug:user.title}));
}
export default async function Home({params}){
    const { username } = await params;
    const settings = {};
    const posts = [{id:0,x:1000, y:0, title:"first post",type:"image", title:"",content:"Hello this is the the content of this posit note",author:"arnav", size:10},];

    const elements = posts.map(element => 
            (<div key={element.id} className={`fixed border-white top-[${element.y}px] left-[${element.x}px]`}>
                <p className="text-bold">{element.title}</p>
                <p className="text-bold">{element.content}</p>
            </div>)
        );
    return (
        <div>
            <Canvas>
                <p>This is the component.</p>
            </Canvas>
            {elements}
        </div>
    )
} 


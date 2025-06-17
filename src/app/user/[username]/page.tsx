export async function generateStaticParams() {
    const users = [{username:"c", title:"1"},{username:"b",title:"2"},{username:"a",title:"3"}];
    return users.map((user)=>({slug:user.title}));
}
export const viewport: Viewport = {
  themeColor: 'white',
}
export default async function Home({params}){
    const { username } = params;
    const settings = {};
    const posts = [{id:0,x:0, y:0, title:500,type:"image", title:"",content:"Hello this is the the content of this posit note",author:"arnav", size:10},];

    const elements = posts.map(element => 
            (<div key={element.id} className={`fixed border-white top-[100px] left-[500px]`}>
                <p className="text-bold">{element.title}</p>
                <p className="text-bold">{element.content}</p>
            </div>)
        );
    return (
        <div>
            {elements}
        </div>
    )
} 
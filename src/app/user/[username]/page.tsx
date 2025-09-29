"use client";
import 'remixicon/fonts/remixicon.css';
import { useState, useEffect} from "react";
import Canvas from "@components/CanvasComponent.tsx";
import DraggableComponentMemo from "@components/DraggableComponent.tsx";
import PostItComponent from "@components/PostItComponent.tsx";
export default function Home({params}){
    const [settings, setSettings] = useState({});
    const posts = [{id:3,x:-300,y:-300, sizeX:400, sizeY:400,title:"a video", type:"youtube", content:"https://www.youtube.com/embed/ezo-szaZUtQ"}, {id:0,x:900,y:0,sizeX:200,sizeY:200, title:"first post",type:"image",content:"https://picsum.photos/id/237/200/300",author:"arnav"}, {id:1,x:500, y:0,sizeX:200,sizeY:200, title:"first post",type:"text",content:"This is a postit note to tell you how cool this project is and it is so amazing you should make more like this to improve your dogshit mental",author:"arnav", font:"",fontSize:"32"},{id:2,x:-100,y:-100, sizeY:200, sizeX:200,author:"arnav", title:"circles",type:"shader",content:"#ifdef GL_ES\nprecision mediump float; \n#endif\nuniform vec2 u_resolution;\nuniform float u_time;\nstruct Surface {\n    float signedDistance;\n    vec3 color;\n};\nSurface sdSphere(vec3 p, float r, vec3 offset, vec3 col){\n    return Surface(length(p - offset) - r,col);\n}\nSurface sdFloor(vec3 p, vec3 col){\n    return Surface(p.y + 1., col);\n}\nSurface minWithColor(Surface obj1, Surface obj2) {\n    if (obj2.signedDistance < obj1.signedDistance) return obj2; // The sd component of the struct holds the \"signed distance\" value\n    return obj1;\n}\nSurface sdScene(vec3 p){\n    Surface s1 = sdSphere(p, .2, vec3(1,0,0), vec3(1, 0, 0));\n    Surface s2 = sdSphere(p, .2, vec3(0,0,0), vec3(0, 1, 0));\n    Surface s3 = sdSphere(p, .2, vec3(-1,0,0), vec3(0, 0, 1));\n    \n    vec3 floorColor = vec3(1. + 0.7*mod(floor(p.x) + floor(p.z), 2.0));\n    Surface flr = sdFloor(p, floorColor);\n    \n    return minWithColor(minWithColor(s3,minWithColor(s1,s2)),flr);\n}\n\nSurface rayMarch(vec3 ro, vec3 rd, float start, float end){\n    float depth = start;\n    Surface d;\n    for (int i = 0; i < 255; i++) {\n        vec3 p = ro + depth * rd;\n        d = sdScene(p);\n        depth += d.signedDistance;\n        if (d.signedDistance < 0.001 || depth > end) break;\n    }\n    d.signedDistance = depth;\n    return d;\n}\nvec3 calcNormal(in vec3 p) {\n    vec2 e = vec2(1.0, -1.0) * 0.0005; // epsilon\n    float r = 1.; // radius of sphere\n    return normalize(\n        e.xyy * sdScene(p + e.xyy).signedDistance +\n        e.yyx * sdScene(p + e.yyx).signedDistance +\n        e.yxy * sdScene(p + e.yxy).signedDistance +\n        e.xxx * sdScene(p + e.xxx).signedDistance);\n}\nvoid main()\n{\n   vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;\n   vec3 backgroundColor = vec3(0.835, 1, 1);\n   \n   vec3 lightPosition = vec3(2, 3, 3);\n   vec3 col = vec3(0);\n   vec3 ro = vec3(.0 , 1 , 4);\n   \n   vec3 rd = normalize(vec3(uv, -1));\n   \n   Surface d = rayMarch(ro, rd, 0., 100.);\n   \n   \n   if (d.signedDistance > 100.0){\n       col = backgroundColor; // ray didn't hit anything\n   } else {\n       vec3 p = ro + rd * d.signedDistance;\n       vec3 normal = calcNormal(p);\n       \n       vec3 lightDirection = normalize(lightPosition - p);\n       \n       float dif = clamp(dot(normal, lightDirection), 0.3, 1.);\n       col = vec3(dif); // ray hit something\n       col = dif * d.color + backgroundColor * .2;\n   }\n   \n   gl_FragColor = vec4(col, 1.0);\n}\n\n" }];

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


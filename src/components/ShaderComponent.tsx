"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDraggableContext } from "@contexts/DraggableContext.tsx"
//import { Canvas }from "glsl-canvas-js";
//import { Canvas }from "node_modules/glsl-canvas-js/dist/cjs/glsl.js";
//import { Canvas } from "../../../node_modules/glsl-canvas-js/dist/cjs/glsl.js";
import { Canvas } from "@glsl/dist/cjs/glsl.js";
function debounce(func, delay){
  let timeoutid;
  return (...args) => {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(() => func(...args), delay);
  }
}
function ShaderComponent({code, onError, onCompile}){
    const {position,size} = useDraggableContext();
    const canvas = useRef(null);
    window.devicePixelRatio = 1;
    const options ={
        "backgroundColor": 'rgba(0.0, 0.0, 0.0, 0.0)',
        "alpha": true,
        "antialias": true,
        "depth": true,
        "failIfMajorPerformanceCaveat": true,
        "powerPreference": "default",
        "premultipliedAlpha": true,
        "preserveDrawingBuffer": false,
        "stencil": false,
        "desynchronized": false
    }
    const sandbox = useRef(null);
    const box = useRef(null);
    const [scrolly, setScroll] = useState(0);
    const isGlsl2 = (newCode) =>{
    if(newCode.length == 0) return false;
    const version_dec = newCode.split("\n")[0];
    if(version_dec == "#version 300 es") return true;
    return false;
    }

    const isBoundingBox = (element) =>{
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
    }
    const isViewable = (instance) => {
    if (isBoundingBox(box.current)){
        instance.play();
    }else{
        instance.pause();
    }
    }
    useEffect(() => {
    if(canvas.current && !sandbox.current){
        const instance = new Canvas(canvas.current, options)
        if (isGlsl2(code)) instance.load(code,vert);
        else instance.load(code);
        instance.on("error", onError);
        sandbox.current = instance;
    }
    }, [canvas])
    useEffect(() => {
    handleChange(code);
    }, [code])
    useEffect(() => {
    handleScroll(scrolly);
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolly])
    function compile(newCode){
    const instance = sandbox.current;
    if(instance){
        if (isGlsl2(newCode)) instance.load(newCode,vert);
        else instance.load(newCode);
        sandbox.current = instance;
        if(box.current) isViewable(instance);
        onCompile();
    }
    }
    const handleChange = useCallback(
    debounce((code) => { 
        compile(code);
    }, 700),
    []
    );
    const handleScroll = useCallback(
    debounce((newScrollY) => { 
        const instance = sandbox.current;
        if(instance) isViewable(instance);
    }, 700),
    []
    );

    return (
        <div ref={box}>
            <canvas ref={canvas} width={size.x} height={size.y} id="canvas" ></canvas>
        </div>
    )
}
export default ShaderComponent;
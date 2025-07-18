import {useEffect, useState, type FC} from "react";

const useWindowSize:FC = () =>{
    const [windowSize, setWindowSize] = useState({
        width:undefined,
        height:undefined
    });

    useEffect(() => {

        function handleResize(){
            setWindowSize({
                width:window.innerHeight,
                height:window.innerWidth
            });
        }
        window.addEventListener("resize", handleResize);

        handleResize();
    
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])
    return windowSize;
}

export default useWindowSize;



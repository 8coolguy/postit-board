import {useState, useEffect} from "react";
import { Form } from "next/form";

function ModalComponenet({isOpen}){
    const [settings, setSettings] = useState({});
    useEffect(() => {
        const response = await fetch("/api/settings");
        const data = await response.json();
        setSettings(data);
    }, [])
    async fucntion updateSettings(){
        //make post request to /api/settings with settings object
    }
    
    
    if(!isOpen) return null;
    return (
        <div>
            This is where im putting the form posts
        </div>
    )
}
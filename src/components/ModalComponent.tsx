import {useState, useEffect} from "react";
import { Form } from "next/form";

function ModalComponent({isOpen}){
    const [settings, setSettings] = useState({});
    useEffect(() => {
        //const response = await fetch("/api/settings");
        //const data = await response.json();
        //setSettings(data);
    }, [])
    async function updateSettings(){
        //make post request to /api/settings with settings object
    }
    
    
    if(!isOpen) return null;
    return (
        <div className="fixed">
            This is where im putting the form posts
        </div>
    )
}
export default ModalComponent;
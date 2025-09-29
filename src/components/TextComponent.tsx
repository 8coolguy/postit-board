import { useDraggableContext } from "@contexts/DraggableContext.tsx"
import { useCanvasContext } from "@contexts/CanvasContext";

function TextComponent({content,font, fontSize}){
    const {position,size} = useDraggableContext();
    const { center, zoom, cursorState, setCursor } = useCanvasContext();
    let fontSizeCss = "";
    let fontTypeCss = "";
    if(typeof fontSize !== 'undefined') fontSizeCss = "text-[" + fontSize + "px]";
    if(typeof fontSize !== 'undefined') fontTypeCss = "font-" + fontSize;
    return (
        <div>
            <p className={`overflow-hidden text-wrap ${fontSizeCss}`}>
                {content}
            </p>
        </div>
    )
}
export default TextComponent;
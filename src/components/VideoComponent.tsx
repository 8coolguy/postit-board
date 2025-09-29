import { useDraggableContext } from "@contexts/DraggableContext.tsx"
function VideoComponent({content}){
    const { position, size } = useDraggableContext();
    return (
        //<iframe title="#zarooratrishta" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width={size.x} height={size.y} src={content} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
    )
}
export default VideoComponent;
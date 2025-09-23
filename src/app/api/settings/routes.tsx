export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

export async function GET() {
    return Response.json({
        title:"Name",
        author:"8coolguy",
        background:{
            type:"image|color|dots|shader|default=blank"
            image:"link",
            shader:"code of some sort"
            color:""
        }
        allowed:{
            image:true,
            shader:true,
            text:true,
            html:true,
            paint:false,
        },
        permissions:{
            create:"public|private|locked",
            move:"public|private|locked",
            delete:"public|private|locked",
            update:"public|private|locked",
            ownerlock:true,
        }
    });
}
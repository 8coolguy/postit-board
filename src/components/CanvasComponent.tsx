import React, { type FC, useEffect, useCallback, useState } from "react";
import {type Point} from "framer-motion"

interface Props {
  children: React.ReactNode;
}

const Canvas: FC <Props> = ({children}) => {
    const canvasHeight = 3000;
    const canvasWidth = 3000;

    const centerH = 1500;
    const centerW = 1500;

    const [offSet,setOffset] = useState<Point>({
        x:-centerX,
        y:-centerH,
    });
}

'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function DraggableComponent(_a) {
    var children = _a.children;
    var _b = react_1.useState(true), state = _b[0], setState = _b[1];
    return (React.createElement("div", { className: "w-full h-full bg-amber-400", onClick: function (event) { setState(!state); console.log("click", event); } }, children));
}
exports["default"] = DraggableComponent;

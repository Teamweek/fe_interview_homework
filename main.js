import "./style.css";
import { createDOMNode } from "./utils";
import { onDrag } from "./dnd";

const dragme = createDOMNode(
  "div",
  {
    onmousedown: onDrag,
    className: "dragme",
  },
  "Drag me"
);

document.querySelector("#app").appendChild(dragme);

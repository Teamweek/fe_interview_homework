import { Mediator } from "./mediator";
import { ShadowElement } from "./shadow";
import { px, setNodeStyle, translate3d } from "./utils";

const SHADOW_ID = "dnd-drag";

function reset(mediator) {
  document.removeEventListener("mousemove", mediator.receive);
  document.removeEventListener("mouseup", mediator.receive);
  mediator.setState("idle");
  document.body.removeChild(cachedDragImage);
}

function defaultDragImage(node) {
  const clone = node.cloneNode(true);
  setNodeStyle(clone, {
    willChange: "transform",
    position: "fixed",
    pointerEvents: "none",
    top: 0,
    left: 0,
    opacity: 0.5,
  });
  return clone;
}

function dragEventIsValid(elementBeingDragged, element) {
  return elementBeingDragged
    && element.getAttribute("data-draggable")
    && element !== elementBeingDragged.parentNode;
}

let cachedCurrentTarget;
let cachedOffsetCoords;
let cachedDragImage;
let elementBeingDragged;

const dndMediator = new Mediator("idle", {
  idle: {
    async mousedown(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      cachedCurrentTarget = evt.currentTarget;
      const rect = cachedCurrentTarget.getBoundingClientRect();
      const offsetX = evt.clientX - rect.left;
      const offsetY = evt.clientY - rect.top;
      cachedOffsetCoords = [offsetX, offsetY];
      cachedDragImage = defaultDragImage(cachedCurrentTarget);

      setNodeStyle(cachedDragImage, {
        transform: translate3d(rect.left, rect.top),
        width: px(rect.width),
        height: px(rect.height),
      });

      elementBeingDragged = evt.target;

      document.addEventListener("mousemove", dndMediator.receive);
      document.addEventListener("mouseup", dndMediator.receive);
      document.addEventListener("mouseover", dndMediator.receive);
      document.addEventListener("mouseout", dndMediator.receive);

      dndMediator.setState("dragging");

      await Promise.resolve();
      document.body.appendChild(cachedDragImage);
    },
  },
  dragging: {
    mousemove(evt) {
      setNodeStyle(cachedDragImage, {
        transform: translate3d(
          evt.clientX - cachedOffsetCoords[0],
          evt.clientY - cachedOffsetCoords[1]
        ),
      });
    },
    mouseup(evt) {
      if (dragEventIsValid(elementBeingDragged, evt.target)) {
        evt.target.appendChild(elementBeingDragged);
        ShadowElement.remove(SHADOW_ID);
      }
      reset(dndMediator);
      dndMediator.setState("idle");
    },
    mouseout() {
      ShadowElement.remove(SHADOW_ID);
    },
    mouseover(evt) {
      if (dragEventIsValid(elementBeingDragged, evt.target)) {
        ShadowElement.create(evt.target, elementBeingDragged, SHADOW_ID);
      }
    }
  },
});

export function onDrag(evt) {
  dndMediator.receive(evt);
}

import { Mediator } from './mediator';
import { px, setNodeStyle, translate3d } from './utils';

let cachedOffsetCoords: number[];
let cachedCurrentTarget: HTMLElement;
let cachedDragImage: HTMLElement;

const reset = (mediator: Mediator) => {
    document.removeEventListener('mousemove', mediator.receive);
    document.removeEventListener('mouseup', mediator.receive);
    mediator.setState('idle');
    document.body.removeChild(cachedDragImage);
};

const defaultDragImage = (node: HTMLElement) => {
    const clone = node.cloneNode(true) as HTMLElement;
    setNodeStyle(clone, {
        willChange: 'transform',
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        opacity: 0.5,
    });
    return clone;
};

const mousemove = (evt: MouseEvent) => {
    setNodeStyle(cachedDragImage, {
        transform: translate3d(evt.clientX - cachedOffsetCoords[0], evt.clientY - cachedOffsetCoords[1]),
    });
};

const mouseup = () => {
    reset(dndMediator);
    dndMediator.setState('idle');
};

const mousedown = async (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    cachedCurrentTarget = evt.currentTarget as HTMLElement;
    const rect = cachedCurrentTarget?.getBoundingClientRect();
    const offsetX = evt.clientX - rect.left;
    const offsetY = evt.clientY - rect.top;
    cachedOffsetCoords = [offsetX, offsetY];
    cachedDragImage = defaultDragImage(cachedCurrentTarget);

    setNodeStyle(cachedDragImage, {
        transform: translate3d(rect.left, rect.top),
        width: px(rect.width),
        height: px(rect.height),
    });

    document.addEventListener('mousemove', dndMediator.receive);
    document.addEventListener('mouseup', dndMediator.receive);

    dndMediator.setState('dragging');

    await Promise.resolve();
    document.body.appendChild(cachedDragImage);
};

const dndMediator = new Mediator('idle', {
    idle: {
        mousedown,
    },
    dragging: {
        mousemove,
        mouseup,
    },
});

export function onDrag(evt: MouseEvent) {
    dndMediator.receive(evt);
}

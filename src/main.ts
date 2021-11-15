import './style.css';
import { createDOMNode } from './utils';
import { onDrag } from './dnd';

const dragme = createDOMNode(
    'div',
    {
        onmousedown: onDrag,
        className: 'p-2 bg-indigo-500 text-white rounded-md',
    },
    'Drag me',
);

document?.querySelector('#drop-area-a')?.appendChild(dragme);

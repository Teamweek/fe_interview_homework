export const isNil = (value: any) => value === null || value === undefined;

const createElement = (tag: string) => {
  return ["svg", "path"].includes(tag)
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);
};

export const setNodeStyle = (node: SVGElement | HTMLElement, style = {}) => {
  for (const prop in style) {
    // @ts-ignore
    node.style[prop] = style[prop];
  }
};

export const createDOMNode = (
  tag: string,
  attrs: { [key: string]: any },
  ...children: any[]
) => {
  const node = createElement(tag);

  for (const key in attrs) {
    if (key.slice(0, 2) === "on") {
      const evtName = key.slice(2);
      const cb = attrs[key];
      node.addEventListener(evtName, cb);
    } else if (
      ["disabled", "autocomplete", "selected", "checked"].indexOf(key) > -1
    ) {
      if (attrs[key]) node.setAttribute(key, key);
    } else if (key === "style") {
      const style = attrs.style;
      setNodeStyle(node, style);
    } else if (key === "dataset") {
      const dataset = attrs.dataset;
      for (const prop in dataset) {
        node.dataset[prop] = dataset[prop];
      }
    } else if (key === "className") node.setAttribute("class", attrs.className);
    else node.setAttribute(key, attrs[key]);
  }

  if (children.length === 0) return node;

  for (const child of children.flat(Infinity)) {
    if (child instanceof Node) node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
};

export const unit = (value: number, unit: string) => {
  return value === 0 ? 0 : `${value}${unit}`;
};

export const px = (value: number) => unit(value, "px");

export const translate3d = (x = 0, y = 0, z = 0) => {
  return `translate3d(${px(x)}, ${px(y)}, ${px(z)})`;
};

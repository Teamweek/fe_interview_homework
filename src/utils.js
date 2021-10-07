export function isNil(value) {
  return value === null || value === undefined;
}

function createElement(tag) {
  if (["svg", "path"].includes(tag)) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }
  return document.createElement(tag);
}

export function setNodeStyle(node, style = {}) {
  for (const prop in style) {
    node.style[prop] = style[prop];
  }
}

export function createDOMNode(tag, attrs, ...children) {
  const node = createElement(tag);
  for (const key in attrs) {
    if (key.slice(0, 2) === "on") {
      const evtName = key.slice(2);
      const cb = attrs[key];
      node.addEventListener(evtName, cb);
    } else if (
      ["disabled", "autocomplete", "selected", "checked"].indexOf(key) > -1
    ) {
      if (attrs[key]) {
        node.setAttribute(key, key);
      }
    } else if (key === "style") {
      const style = attrs.style;
      setNodeStyle(node, style);
    } else if (key === "dataset") {
      const dataset = attrs.dataset;
      for (const prop in dataset) {
        node.dataset[prop] = dataset[prop];
      }
    } else if (key === "className") {
      node.className = attrs.className;
    } else {
      node.setAttribute(key, attrs[key]);
    }
  }
  if (children.length === 0) {
    return node;
  }
  for (const child of children.flat(Infinity)) {
    if (child instanceof Node) {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(child));
    }
  }
  return node;
}

export function unit(value, unit) {
  if (value === 0) return 0;
  return `${value}${unit}`;
}

export function px(value) {
  return unit(value, "px");
}

export function translate3d(x = 0, y = 0, z = 0) {
  return `translate3d(${px(x)}, ${px(y)}, ${px(z)})`;
}

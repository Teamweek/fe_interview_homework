export class ShadowElement {

  static clone(element, id) {
    const node = element.cloneNode(true);
    node.setAttribute("shadow-element", id);
    node.classList.add("opacity-5");
    node.classList.add("pointer-events-none");
    return node;
  }

  static create(parent, element, id) {

    if (typeof id !== "string" || id.trim() === "string") {
      throw new Error("Shadow id is invalid");
    }

    if (!parent) {
      throw new Error("Shadow parent is invalid");
    }

    if (!element) {
      throw new Error("Shadow element is invalid");
    }

    const shadow = this.clone(element, id);
    parent.appendChild(shadow);

  }

  static remove(id) {
    const shadow = document.querySelector(`[shadow-element=${id}]`)
    if (shadow) shadow.remove();
  }

}
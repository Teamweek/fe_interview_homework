export class Mediator {
  #state;
  constructor(entryStateValue, description) {
    this.#state = entryStateValue;
    this.description = description;

    // so that we can call mediator.receive as a standalone function
    this.receive = this.receive.bind(this);
  }
  setState(value) {
    this.#state = value;
  }
  receive(event) {
    this.description[this.#state]?.[event.type]?.(event);
  }
}

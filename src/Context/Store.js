import { EventEmitter } from "events";
import { mapActions } from "./utils";
export default class Store extends EventEmitter {
  constructor({ actions = {}, state = {} }) {
    super();
    this.state = state;
    this.actions = mapActions.call(this, actions);
  }
  getState = () => {
    return this.state;
  };
  setState = state => {
    this.state = state;
    this.emit("update", this.state);
  };
}

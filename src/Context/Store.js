import { EventEmitter } from "events";
import { mapActions, mapComputed, mapEffects } from "./utils";
export default class Store extends EventEmitter {
  constructor({ actions = {}, state = {}, computed = {}, effects = {} }) {
    super();

    const update = setState.bind(this);
    this.state = state;
    this.actions = mapActions.call(this, actions);
    this.computed = mapComputed.call(this, computed);
    this._computed = computed;
    this.effects = mapEffects.call(this, effects, update);
  }
  getState = () => {
    return this.state;
  };
  dispatch = (key, ...args) => {
    this.actions[key](...args);
  };
  commit = (key, ...args) => {
    this.effects[key](...args);
  };
}

const setState = function(state) {
  this.state = { ...this.state, ...state };
  this.computed = mapComputed.call(this, this._computed);
  this.emit("update", this);
  Object.keys(state).forEach(key => {
    this.emit(key, this.state[key]);
  });
};

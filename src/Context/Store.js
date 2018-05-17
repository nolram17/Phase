import { EventEmitter } from "events";
import { mapActions,mapComputed } from "./utils";
export default class Store extends EventEmitter {
  constructor({ actions = {}, state = {}, computed = {} }) {
    super();
    this.state = state;
    this.actions = mapActions.call(this, actions,setState.bind(this));
    this.computed = mapComputed.call(this,computed);
    this._computed=computed;
    
  }
  getState = () => {
    return this.state;
  }
  dispatch=(key,...args)=>{
    this.actions[key](...args)
  }
 
}
const setState = function(state) {
  this.state = { ...this.state, ...state }
  this.computed = mapComputed.call(this, this._computed);
  this.emit("update", this);
  Object.keys(state).forEach(key => {
    this.emit(key, this.state[key]);
  });
};
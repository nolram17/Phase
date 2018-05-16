import { EventEmitter } from "events";
import React, { Component, createContext } from "react";

const Context = createContext(null);
export class Store extends EventEmitter {
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

const mapActions = function(actions) {
  return Object.keys(actions).reduce((finalActions, key) => {
    return {
      ...finalActions,
      [key]: async (...args) => {
        let state = this.getState();
        let result = actions[key](state, ...args);
        if (isPromise(result)) {
          return result.then(this.setState).catch(console.log);
        } else if (typeof result === "object") {
          return this.setState(result);
        }
      }
    };
  }, {});
};
export class Provider extends Component {
  constructor(props) {
    super(props);

    let { store } = props;
    if (!store) {
      throw new Error("store is rquired");
    }
    store.on("update", state => {
      this.setState(state);
    });
    this.actions = store.actions;
  }
  render() {
    const { Provider } = Context;
    return (
      <Provider value={{ ...this.state, ...this.actions }}>
        {this.props.children}
      </Provider>
    );
  }
}
export const connect = Component => props => (
  <Context.Consumer>
    {context => <Component {...props} {...context} />}
  </Context.Consumer>
);
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

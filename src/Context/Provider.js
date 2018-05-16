import React, { Component} from "react";
import Context from "./Context"
var _ = require('lodash');
export default class Provider extends Component {
  constructor(props) {
    super(props);

    let { store } = props;
    if (!store) {
      throw new Error("store is rquired");
    }
    store.on("update",( { state, computed}) => {
      this.computed = computed;
      this.setState(state);
    });
    this.state=store.state
    this.actions = store.actions;
    this.computed=store.computed;
  }
  

  render() {
  
    return (
      <Context.Provider value={{ ...this.state, ...this.actions,...this.computed }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
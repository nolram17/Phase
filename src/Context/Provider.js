import React, { Component} from "react";
import Context from "./Context"
export default class Provider extends Component {
  constructor(props) {
    super(props);

    let { store } = props;
    if (!store) {
      throw new Error("store is rquired");
    }
    store.on("update", state => {
      this.setState(state);
    });
    this.state=store.state
    this.actions = store.actions;
  }
  

  render() {
  
    return (
      <Context.Provider value={{ ...this.state, ...this.actions }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
import React, { Component } from "react";
import Context from "./Context";
import Store from "./Store";
import PropTypes from "prop-types";
class Provider extends Component {


  static propTypes = {
    store: PropTypes.instanceOf(Store)
  };
  constructor(props) {
    super(props);

    let { store } = props;
    if (!store) {
      throw new Error("store is rquired");
    }
    store.on("update", ({ state, computed }) => {
      this.computed = computed;
      this.setState(state);
    });
    this.state = store.state;
    this.actions = store.actions;
    this.computed = store.computed;
  }
  createState() {
    return {
      ...this.state,
      ...this.actions,
      ...this.computed
    };
  }
  render() {
    return (
      <Context.Provider value={this.createState()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}



export default Provider

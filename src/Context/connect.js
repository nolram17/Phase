import React from "react"
import Context from "./Context";
export const connect = Component => props => (
  <Context.Consumer>
    {context => <Component {...props} {...context} />}
  </Context.Consumer>
);

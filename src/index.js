import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import { Provider,Store,connect } from "./Context";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
var y= new Store({
  state:{
    count:0,
    c:3
  },
  actions:{
    inc({count}){
      return({count:count+1})
    }
  },
  computed:{
     name(state){
       return state.count
     }
  }
})
const X= connect((props)=>{
  console.log(props)
  return<div>Test
    {props.count}
    <button onClick={props.inc} >+</button>
    <button onClick={e=>y.dispatch("inc")} >+</button>
  </div>
})
const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <Provider store={y}>
      <X/>
    </Provider>
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));

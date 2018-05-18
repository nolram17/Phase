import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import { Provider, Store, connect } from "./Context";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
var y = new Store({
  state: {
    count: 0,
    c: 3
  },
  actions: {
    inc({ commit }) {
      commit("inc");
    },
    add({ commit }, num) {
      commit("add", num);
    },
   
   incAsync({ commit }) {
      setTimeout(() => commit("inc"), 2000);
    }
  },
  computed: {
    name(state) {
      return state.count;
    }
  },
  effects: {
    inc(state) {
      state.count = state.count + 1;
    },
    add(state, num) {
      state.count = state.count + num;
    }
  }
});
const X = connect(props => {
  console.log(props);
  return (
    <div>
      Test
      {props.count}
      <button onClick={props.inc}>+1</button>
      <button onClick={e => y.dispatch("add",5)}>+5</button>
      <button onClick={e => props.incAsync()}>+1 in 2</button>
    </div>
  );
});
const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <Provider store={y}>
      <X />
    </Provider>
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));

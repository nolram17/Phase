function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}
export const checkState = (prevState, state, keys) => {};

export const mapEffects = function(effects, commit) {
  return Object.keys(effects).reduce((final, key) => {
    if (!effects[key] || typeof effects[key] != "function") return;
    return {
      ...final,
      [key]:(...args) => {
        let state = this.getState();
        let result = effects[key](state, ...args);
        commit(state);
      }
    };
  }, {});
};
export const mapActions = function(actions) {
  return Object.keys(actions).reduce((finalActions, key) => {
    if (!actions[key] || typeof actions[key] != "function") return;
    return {
      ...finalActions,
      [key]: async (...args) => {
        let state = this.getState();
        const store = {
          state: this.getState(),
          dispatch: this.dispatch,
          commit: this.commit
        };
        return actions[key](store, ...args);
      }
    };
  }, {});
};
export const mapComputed = function(computed) {
  console.log("state", this.getState());
  return Object.keys(computed).reduce((comp, key) => {
    return {
      ...comp,
      [key]: computed[key](this.getState())
    };
  }, {});
};

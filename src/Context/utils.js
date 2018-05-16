
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

export const mapActions = function (actions) {
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
export default class Model extends EventTarget {
  async ready() {}

  addEventListener(type, ...rest) {
    [].concat(type).forEach((name) => {
      super.addEventListener(name, ...rest);
    });
  }
}

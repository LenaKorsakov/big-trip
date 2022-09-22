export default class Model extends EventTarget {
  async ready() {}

  /**
   * @param {string} type
   * @param {[EventListener | EventListenerObject, EventListenerOptions | boolean]} rest
   */
  addEventListener(type, ...rest) {
    [].concat(type).forEach((name) => {
      super.addEventListener(name, ...rest);
    });
  }
}

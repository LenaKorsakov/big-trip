export default class Enum {
  static resolveKey(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
}

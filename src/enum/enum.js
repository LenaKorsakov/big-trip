export default class Enum {
  static findKey(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
}

import './view.css';

export default class View extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML(
      this.adjacentHtmlPosition,
      this.createAdjacentHtml(...arguments)
    );
  }

  /**
   * @type {InsertPosition}
   */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /**
   * @param {...*} data
   */
  createAdjacentHtml(...data) {
    return data.join('');
  }

  /**
   * @param {boolean} flag
   */
  display(flag) {
    this.hidden = !flag;

    return this;
  }

  shake() {
    this.classList.add('shake');
    this.addEventListener('animationend', this.onAnimationEnd, {once: true});
  }

  /**
   * @param {AnimationEvent} event
   */
  onAnimationEnd(event) {
    if (event.animationName === 'shake') {
      this.classList.remove('shake');
    }
  }

  static get tagNamePrefix() {
    return 'trip';
  }

  static get tagName() {
    const hyphenCaseName = this.name.replace(/[A-Z]/g, '-$&').toLowerCase();

    return this.tagNamePrefix + hyphenCaseName.replace(/-view$/, '');
  }

  static toString() {
    return this.tagName;
  }
}

/**
 * @param {TemplateStringsArray} strings
 * @param  {...*} values
 * @return {string}
 */
export function html(strings, ...values) {
  return values.reduce((result, value, index) => {
    if (typeof value === 'function') {
      value = `<${value}></${value}>`;
    }
    if (Array.isArray(value)) {
      value = value.join('');
    }
    return result + value + strings[index + 1];

  }, strings[0]);
}

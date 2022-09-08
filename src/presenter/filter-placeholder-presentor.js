import Presenter from './presenter';
import FilterPlaceholderMessage from '../enum/filter-placeholder';

/**
 * @template {FilterPlaceholderModel} Model
 * @template {FilterPlaceholderView} View
 * @extends Presenter<Model,View>
 */
export default class FilterPlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

  }

  togglePlaceholderMessage() {
    //проверить, есть ли точки (спросить у модели)
    //если их нет, то через getFilter(?) узнать, какой фильтер выбран по предикату?
    //передать message во view (message можно узнать в enum через ключ фильтра)
    //вызвать у view метод, который уберет hidden
  }
}

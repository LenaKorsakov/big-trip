import Presenter from './presenter';
import FilterType from '../enum/filter-type';
import FilterLabel from '../enum/filter-label';
import FilterPredicate from '../enum/filter-predicate';
import Mode from '../enum/mode';

/**
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends Presenter<Model,View>
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.#buildView();

    this.view.addEventListener('change', this.#onViewChange.bind(this));

    this.model.addEventListener('mode', this.#onModelMode.bind(this));
    this.model.pointsModel.addEventListener(['add', 'update', 'remove'], this.#onPointsModelChange.bind(this));
  }

  #buildView() {
    const filterOptions = Object.keys(FilterType).map((key) => [FilterLabel[key], FilterType[key]]);

    this.view.setOptions(filterOptions);

    this.#updateViewValue();
    this.#updateViewOptionsDisabled();
  }

  #updateViewValue() {
    const filterKey = FilterPredicate.findKey(this.model.pointsModel.getFilter());

    return this.view.setValue(FilterType[filterKey]);
  }

  #updateViewOptionsDisabled() {
    const predicates = Object.values(FilterPredicate);
    const flags = predicates.map((predicate) => !this.model.pointsModel.list(predicate).length);

    this.view.setOptionsDisabled(flags);
  }

  #onViewChange() {
    const filterKey = this.view.getValue().toUpperCase();

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setFilter(FilterPredicate[filterKey]);
  }

  #onModelMode() {
    if (this.model.getMode() === Mode.CREATE) {
      this.model.pointsModel.setFilter(FilterPredicate.EVERYTHING);

      this.#updateViewValue();
    }
  }

  #onPointsModelChange() {
    this.#updateViewOptionsDisabled();
  }
}

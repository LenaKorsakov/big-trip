import DataTableModel from './data-table-model';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends CollectionModel<Item,ItemAdapter>
 */

export default class FilterPlaceholderModel extends DataTableModel {

  constructor(...init) {
    super(...init);
  }

  /**
 *
 * @return {boolean}
 */
  isPointsExist(){
    return !! this.listAll().length;
  }
}

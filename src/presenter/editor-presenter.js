import EditorView from '../view/editor-view';

export default class EditorPresenter {
  constructor() {
    this.view = new EditorView();

    const {typeSelectView} = this.view;
    typeSelectView
      .setOptions([
        ['Taxi', 'taxi'],
        ['Bus', 'bus'],
        ['Flight', 'flight']
      ])
      .select('taxi');
  }

}


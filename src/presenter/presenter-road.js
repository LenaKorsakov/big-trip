import TripPointEditorView from '../view/point-editor-view';
import TripPointsListView from '../view/points-list-view';
import TripPointView from '../view/point-view';
import { render } from '../render';

export default class RoadPresenter {
  tripRoadComponent = new TripPointsListView();

  init = (tripRoadContainer) => {
    this.tripRoadContainer = tripRoadContainer;

    render(this.tripRoadComponent,this.tripRoadContainer);
    render(new TripPointEditorView(), this.tripRoadComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render (new TripPointView(),this.tripRoadComponent.getElement());
    }
  };
}

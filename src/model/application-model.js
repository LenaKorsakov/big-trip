import Model from './model';

export default class ApplicationModel extends Model {
  constructor(points, destinations, offerGroups) {
    super();

    this.points = points;
    this.destinations = destinations;
    this.offerGroups = offerGroups;
  }

  async ready() {
    await Promise.all([
      this.points.ready(),
      this.destinations.ready(),
      this.offerGroups.ready()
    ]);
  }
}


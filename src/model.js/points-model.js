import { generatePoint } from '../mock/mock-point';

export default class PointsModel {
  get() {
    return Array.from({length: 10}, generatePoint);
  }
}

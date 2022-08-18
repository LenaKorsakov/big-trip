import { getRandomValue, getRandomInteger} from '../utils';
import dayjs from 'dayjs';
import { MAX_OFFERS_IN_GROUP, MAX_ID, MAX_HOURS_GAP, MAX_MINUTES_GAP, PRICE_MAX, PRICE_MIN, MAX_OFFERS_NUM, pointTypes, destinationsNames, destinationsDescriptions, PICTURE_MAX, PICTURE_MIN, offersTitles, POINTS_NUMBER} from './const';

const generatePrice = () => getRandomInteger(PRICE_MIN, PRICE_MAX);
const generateDescription = () => getRandomValue(destinationsDescriptions);
const generateType = () => getRandomValue(pointTypes);
const generatePicture = () => `http://picsum.photos/248/152?r=${getRandomInteger(PICTURE_MIN, PICTURE_MAX)}`;
const generateDate = () => {
  const hoursGap = getRandomInteger(-MAX_HOURS_GAP, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP,MAX_MINUTES_GAP);

  return dayjs().add(hoursGap, 'hour').add(minutesGap, 'minute');
};

const generateNextDate = (dateFrom) => {
  const minutesGap = getRandomInteger(0, MAX_MINUTES_GAP);

  return dateFrom.add(minutesGap, 'minutes');
};

const allDestinations = destinationsNames.map( (value, index) => (
  {
    id: index,
    description: generateDescription(),
    name: value,
    pictures: [
      {
        src: generatePicture(),
        description: generateDescription(),
      }]
  })
);

const generateDestinations = () => allDestinations;
const generateDestination = () => getRandomValue(allDestinations);

const allOfferGroups = pointTypes.map((pointType) => ({
  type: pointType,
  offers: Array.from({length:MAX_OFFERS_IN_GROUP}).fill().map(() => ({
    id: getRandomInteger(0, MAX_ID),
    title: getRandomValue(offersTitles),
    price: getRandomInteger(PRICE_MIN, PRICE_MAX)
  }))
}));

const generateOfferGroups = () => allOfferGroups;

const generatePoint = () => {
  const dateFrom = generateDate();
  const dateTo = generateNextDate(dateFrom);
  const pointType = generateType();

  return {
    basePrice: generatePrice(),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: generateDestination().id,
    id: getRandomInteger(0, PRICE_MAX),
    offers: Array.from({length: MAX_OFFERS_NUM}, () => getRandomValue(allOfferGroups.find((offerGroup) => offerGroup.type === pointType).offers)).slice(0, getRandomInteger(0, MAX_OFFERS_NUM)).map((offer) => offer.id),
    type: pointType
  };
};

const generatePoints = () => Array.from({length: POINTS_NUMBER}, generatePoint);


export {generatePoints, generateOfferGroups, generateDestinations};

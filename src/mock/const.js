const PRICE_MAX = 500;
const PRICE_MIN = 1;
const PICTURE_MIN = 1;
const PICTURE_MAX = 5;
const MAX_OFFERS_IN_GROUP = 5;
const MAX_OFFERS_NUM = 2;
const MAX_PICTURES = 5;
const MAX_HOURS_GAP = 200;
const MAX_MINUTES_GAP = 120;
const POINTS_NUMBER = 10;
const MAX_ID = 100000;

const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destinationsNames = ['Bordeaux', 'Lyon', 'Etretat', 'Paris', 'Marselle', 'Nice','Cannes'];
const destinationsDescriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.'
];
const offersTitles = [
  'Upgrade to a business class.',
  'Bring champaigne.',
  'Silent driver.',
  'Add luggage.',
  'Add breakfast.',
  'Switch to comfort.',
  'Book tickets',
  'Lunch in city',
  'Rent a car',
  'Add lunch'
];

export { MAX_PICTURES, MAX_OFFERS_IN_GROUP, MAX_ID, MAX_HOURS_GAP, MAX_MINUTES_GAP, PRICE_MAX, PRICE_MIN, PICTURE_MAX, PICTURE_MIN, MAX_OFFERS_NUM, pointTypes, destinationsNames, destinationsDescriptions, offersTitles, POINTS_NUMBER};

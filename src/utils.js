export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

export const getRandomCombination = (combinationLength) => {
  const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let header = '';

  for (let i = 0; i < combinationLength; i++){
    header += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
  }
  return header;
};


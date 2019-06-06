export const getMixArray = (arr) =>
  arr.slice().sort(() => 0.5 - Math.random());

export const getClipArray = (arr, count) => {
  return arr.slice(0, count);
};

export const getRandomArray = (arr, count) =>
  getClipArray(getMixArray(arr), count);

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (1 + max - min)) + min;

export const getRandomBool = () =>
  getRandomInt(0, 1) === 1;


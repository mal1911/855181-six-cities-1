export const getRandomArray = (arr, count = arr.length) =>
  arr.slice(0, count).sort(() => 0.5 - Math.random());

const getRandomInteger = (a, b) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const random = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return random;
};

const getRandomArrayElement = (items) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator};

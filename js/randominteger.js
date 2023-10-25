const getRandomInteger = (a, b) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const random = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return random;
};

export {getRandomInteger};

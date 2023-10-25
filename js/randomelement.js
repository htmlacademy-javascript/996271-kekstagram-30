const getRandomArrayElement = (items) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

export {getRandomArrayElement};

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const COMMENT_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESC_LIST = [
  'Фотография нежного заката над горизонтом, где оранжевое и розовое небо переливаются яркими красками, создавая невероятный пейзаж.',
  'На снимке видно милую кофейню с уютным интерьером, где на столиках стоят ароматные чашки кофе, а на фоне играет приятная музыка.',
  'Фотография детей, играющих в парке, счастливо брызгающих водой и смеющихся, отражает радость и беззаботность детства.',
  'Кадр с потрясающими горами, покрытыми снегом, и ясным голубым небом, создает впечатление величия и спокойствия.',
  'Фото цветущего поля с маками и подсолнухами, где солнечные лучи проникают сквозь облака, придают картине яркие и теплые оттенки.',
  'На снимке морская береговая линия с мягкими волнами, отражающими закатное солнце, создающими умиротворенную атмосферу.'
];
const NAME = [
  'Дима',
  'Паша',
  'Лера',
  'Ваня',
  'Толя',
  'Миша'
];

const getRandomInteger = (a, b) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const random = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return random;
};

// eslint-disable-next-line no-return-assign, no-const-assign
// const getRandomArrayElement = (items) =>
//   items[getRandomInteger = (0, items.length - 1)];

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

const generatedCommentId = createIdGenerator();

const generateMessage = () => Array.from(
  { length: getRandomInteger(1)},
  () => getRandomArrayElement(COMMENT_LIST),
);

const createComment = () => ({
  id: generatedCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAME)
});

const generatePhotoId = createIdGenerator();

// eslint-disable-next-line no-unused-vars
const createPicture = (index) => ({
  id: generatePhotoId(1, PICTURE_COUNT),
  url: `photo/${generatePhotoId(1, PICTURE_COUNT)}`,
  description: getRandomArrayElement(DESC_LIST),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment
  ),
});

const getPicture = () => Array.from(
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

const result3 = getPicture();

console.log(result3);

debugger;

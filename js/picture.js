import { getPicture } from './data.js';

const picContainer = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnails = getPicture();

const pictureFragment = document.createDocumentFragment();

createThumbnails.forEach(({url, description, likes, comments}) => {
  const picElement = picTemplate.cloneNode(true);
  picElement.querySelector('.picture__img').src = url;
  picElement.querySelector('.picture__info').alt = description;
  picElement.querySelector('.picture__likes').textContent = likes;
  picElement.querySelector('.picture__comments').textContent = comments.length;
  pictureFragment.append(picElement);
});

picContainer.append(pictureFragment);

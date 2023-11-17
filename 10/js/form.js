import { resetScale } from './scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effect.js';

const MAX_HASTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const textError = {
  INVALID_COUNT: `Максимум ${MAX_HASTAG_COUNT} хештегов.`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTER: 'Не правильный хештег',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hastagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModalForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('model-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModalForm = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  body.classList.remove('model-open');
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hastagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' || !isTextFieldFocused()) {
    evt.preventDefault();
    hideModalForm();
  }
}

const onCancelButtonClick = () => {
  hideModalForm();
};

const onFileInputChange = () => {
  showModalForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hastagField,
  hasValidCount,
  textError.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hastagField,
  hasUniqueTags,
  textError.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hastagField,
  hasValidTags,
  textError.INVALID_PATTER,
  1,
  true
);

fileField.addEventListener('change', onFileInputChange);
form.addEventListener('submit', onFormSubmit);
cancelButton.addEventListener('click', onCancelButtonClick);
initEffect();

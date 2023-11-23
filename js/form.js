import { resetScale } from './scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effect.js';
import { sendPictures } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const textError = {
  INVALID_COUNT: `Максимум ${MAX_HASTAG_COUNT} хештегов.`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTER: 'Не правильный хештег',
};

const submitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hastagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? submitButtonCaption.SUBMITTING
    : submitButtonCaption.IDLE;
};

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

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  const fileExtension = FILE_TYPES.map((type) => type.toLowerCase());

  return fileExtension.includes(fileName.split('.').pop());
};

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
  const isErrorMessageExists = () => Boolean(document.querySelector('.error'));
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    hideModalForm();
  }
}

const onCancelButtonClick = () => {
  hideModalForm();
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModalForm();
};

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    toggleSubmitButton(false);
    hideModalForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }

};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
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

import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './utils.js';
import { initFilters } from './filter.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilters(pictures);
  } catch {
    showErrorMessage();
  }
};

bootstrap();

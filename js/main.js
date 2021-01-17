import images from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lagreImage = document.querySelector('img.lightbox__image');
const openModalImage = document.querySelector('div.lightbox');
const closeModalImageOnOverlay = document.querySelector(
  'div.lightbox__overlay',
);
const closeBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const imagesMarkup = createGalleryItemsMarkup(images);
let indexImage = 0;

function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }, index) => {
      return `
        <li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
        />
        </a>
        </li>
        `;
    })
    .join('');
}

galleryRef.insertAdjacentHTML('beforeend', imagesMarkup);

galleryRef.addEventListener('click', onGalleryClick);

closeBtnRef.addEventListener('click', closeModalImage);

closeModalImageOnOverlay.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeModalImage();
  }
});

function onGalleryClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const largeImageUrl = event.target.dataset.source;

  setLargeImageSrc(largeImageUrl);

  indexImage = Number(event.target.dataset.index);

  openModalImage.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);

  window.addEventListener('keydown', flippingImages);
}

function setLargeImageSrc(url) {
  lagreImage.src = url;
}

function closeModalImage() {
  openModalImage.classList.remove('is-open');
  lagreImage.src = '';
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', flippingImages);
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModalImage();
  }
}

function flippingImages(event) {
  if (event.code === 'ArrowRight') {
    indexImage += 1;
    if (indexImage >= images.length) {
      indexImage = 0;
    }
    lagreImage.src = images[indexImage].original;
  } else if (event.code === 'ArrowLeft') {
    indexImage -= 1;
    if (indexImage < 0) {
      indexImage = images.length - 1;
    }
    lagreImage.src = images[indexImage].original;
  }
}

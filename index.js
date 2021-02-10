import gallery from './js/gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const imgRef = document.querySelector('.lightbox__image');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxBtn = document.querySelector('.lightbox__button');

galleryRef.addEventListener('click', openModal);
lightboxBtn.addEventListener('click', closeModal);

const galleryMarkup = gallery.map((item, index) => {
  const itemRef = document.createElement('li');
  const linkRef = document.createElement('a');
  const imgRef = document.createElement('img');

  imgRef.src = item.preview;
  imgRef.alt = item.description;
  imgRef.dataset.source = item.original;
  imgRef.dataset.index = index;
  linkRef.href = item.original;

  itemRef.classList.add('gallery__item');
  linkRef.classList.add('gallery__link');
  imgRef.classList.add('gallery__image');

  linkRef.append(imgRef);
  itemRef.append(linkRef);
  galleryRef.append(itemRef);
});

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    lightboxRef.classList.add('is-open');
    imgRef.dataset.index = event.target.dataset.index;
    imgRef.src = event.target.dataset.source;
    imgRef.alt = event.target.alt;
  }
}

function closeModal() {
  lightboxRef.classList.remove('is-open');
  imgRef.src = '';
  imgRef.alt = '';
}

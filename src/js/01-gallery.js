// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Change code below this line

const gallery = document.querySelector('.gallery');

const images = galleryItems.map(({ preview, original, description }) =>
        `<a  class="gallery__item" href="${original}">
        <img class="gallery__image" src='${preview}' alt='${description}'</img>
        </a>`
).join('');
    
gallery.insertAdjacentHTML('beforeend',images);

let galleryEl = new SimpleLightbox('.gallery a', {captionsData: "alt", captionDelay:250,});


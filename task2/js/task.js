import gallery from "./gallery-items.js";

const containerCountRef = document.querySelector(".counter-box");
const containerGalleryRef = document.querySelector(".js-gallery");

const createImgCounter = document.createElement('p');
createImgCounter.classList.add("counter");

const createGalleryRef = galleryImg => {
   const createListItemRef = document.createElement("li");
   createListItemRef.classList.add("gallery__item");

   const createImageRef = document.createElement("img");
   createImageRef.classList.add("gallery__image");
   createImageRef.src = galleryImg.image;
   createImageRef.dataset.source = galleryImg.image;
   createListItemRef.appendChild(createImageRef);
   return createListItemRef;
};

const imageList = gallery.map(galleryImg => createGalleryRef(galleryImg));

containerGalleryRef.append(...imageList);
containerCountRef.append(createImgCounter);

const refs = {
   lightbox: document.querySelector(".lightbox"),
   lightboxImg: document.querySelector(".lightbox__image"),
   lightboxClose: document.querySelector("button[data-action='close-lightbox']"),
   lightboxOverlayClose: document.querySelector(".lightbox__content")
};

containerGalleryRef.addEventListener("click", onImgClick);

console.log(imageList.length);

const actualDate = new Date().toLocaleString("ua", {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	timezone: 'UTC',
	hour: 'numeric',
	minute: 'numeric',
});

createImgCounter.textContent = `Всего картинок: ${imageList.length}. На дворе: ${actualDate}`;

function onImgClick(event) {
   event.preventDefault();
   if (event.target.nodeName !== "IMG") {
      return;
   }
   const imageRef = event.target;
   const largeImageURL = imageRef.dataset.source;

   refs.lightbox.classList.add("is-open");
   setLargeImageSrc(largeImageURL);

   window.addEventListener("keydown", onPressEsc);
}

function setLargeImageSrc(url) {
   refs.lightboxImg.src = url;
}

function onCloseLightbox() {
   refs.lightboxImg.src = "";
   refs.lightbox.classList.remove("is-open");
}

function onPressEsc(event) {
   if (event.code === "Escape") {
      onCloseLightbox();
   }
}

refs.lightboxClose.addEventListener("click", () => {
   window.removeEventListener("keydown", onPressEsc);
   onCloseLightbox();
});

refs.lightboxOverlayClose.addEventListener("click", event => {
   window.removeEventListener("keydown", onPressEsc);
   if (event.target === event.currentTarget) {
      onCloseLightbox();
   }
});

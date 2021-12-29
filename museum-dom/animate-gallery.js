"use strict";

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  // loop over every image
  // figure out where it needs to be shown
  // at least 50% of its height

  sliderImages.forEach(function (sliderImage) {
    //half way through images
    var slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // bottom of the image
    var imageBottom = sliderImage.offsetTop + sliderImage.height;
    // half way in the images
    var isHalfShown = slideInAt > sliderImage.offsetTop;

    var isNoScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNoScrolledPast) {
      sliderImage.classList.add("active-gallery");
    } else {
      sliderImage.classList.remove("active-gallery");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));

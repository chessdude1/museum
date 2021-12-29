let customizeThumbnails = document.querySelector(".customize-thumbnails");
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");
var slider = tns({
  mouseDrag: true,
  items: 1,
  loop: true,
  slideBy: 1,
  container: ".my-slider",
  preventScrollOnTouch: "auto",
  prevButton: ".prev",
  gutter: 20,
  controlsPosition: "bottom",
  navPosition: "bottom",
  center: true,
  controlsContainer: ".customize-controls",
  navContainer: ".customize-thumbnails",
  controls: true,
  autoplay: false,
  navAsThumbnails: true,
});

customizeThumbnails.addEventListener("click", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});

prevButton.addEventListener("click", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});
nextButton.addEventListener("click", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});

document.querySelector(".my-slider").addEventListener("touchend", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});
document.querySelector(".my-slider").addEventListener("mouseup", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});
document.querySelector(".my-slider").addEventListener("mouseout", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});
document.querySelector(".my-slider").addEventListener("click", (e) => {
  let startIndex = 1;
  document.querySelector(".currentSlide").textContent = `0${
    startIndex + slider.getInfo().index % 5
  } | 05`;
});

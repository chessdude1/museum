var slider2 = tns({
  mouseDrag: true,
  items: 3,
  loop: true,
  slideBy: 1,
  container: ".video-slider__container",
  gutter: 40,
  navPosition: "bottom",
  controlsContainer: ".video-slider__navigation-container",
  navContainer: ".video-slider__bullets-container",
  nav: true,
  controls: true,
  autoplay: false,
  navAsThumbnails: true,
});

let videoSliderBody = document.querySelector(".video-slider__container");
let nextButton = document.querySelector(".next_video");
let bulletButton = document.querySelectorAll(".bullet_video");
let prevButton = document.querySelector(".prev_video");

for (let i = 0; i < bulletButton.length; i++) {
  bulletButton[i].addEventListener("click", (e) => {
    stopAllVideo();
  });
}
function stopAllVideo() {
  let videos = document.querySelectorAll("#video-in-slider");
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].classList.contains("video-slider-1")) {
      videos[i].setAttribute(
        "src",
        "https://www.youtube.com/embed/aWmJ5DgyWPI"
      );
    } else if (videos[i].classList.contains("video-slider-2")) {
      videos[i].setAttribute(
        "src",
        "https://www.youtube.com/embed/Vi5D6FKhRmo"
      );
    } else if (videos[i].classList.contains("video-slider-3")) {
      videos[i].setAttribute(
        "src",
        "https://www.youtube.com/embed/NOhDysLnTvY"
      );
    } else if (videos[i].classList.contains("video-slider-4")) {
      videos[i].setAttribute(
        "src",
        "https://www.youtube.com/embed/zp1BXPX8jcU"
      );
    } else if (videos[i].classList.contains("video-slider-5")) {
      videos[i].setAttribute(
        "src",
        "https://www.youtube.com/embed/2OR0OCr6uRE"
      );
    } else {
      console.log("smth get wrong");
    }
  }
}

nextButton.addEventListener("click", (e) => {
  stopAllVideo();
});

prevButton.addEventListener("click", (e) => {
  stopAllVideo();
});

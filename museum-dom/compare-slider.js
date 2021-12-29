function compareImages() {
  const slider = document.querySelector(".img-compare-slider");
  const sliderImg = document.querySelector(".img-compare-slider-img");
  const imgAfter = document.querySelector(".img-after");

  slider.addEventListener("input", handleCoordinates);
  slider.addEventListener("change", handleCoordinates);

  function handleCoordinates(e) {
    imgAfter.style.width = +e.target.value - 45 + "px";
    let leftAdd = e.target.value;
    if (leftAdd < 50) {
      leftAdd = 50;
    }
    sliderImg.style.left = +leftAdd + "px";
  }
}

compareImages();

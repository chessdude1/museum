console.log(
  "To see the validation of the form, hover over it with the mouse, errors appear in the lower left corner"
);
console.log("hello");
const body = document.body;
const burger = document.querySelector(".burger");
const menu_burger = document.querySelector(".menu-burger");
function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const button = document.querySelector(".tickets-content__btn-buy-now");
button.addEventListener("click", createRipple);

document
  .querySelector(".tickets-content__btn-buy-now")
  .addEventListener("click", () => {
    document.querySelector(".menu_mobile").classList.add("active");
    document.querySelector(".close-menu").classList.add("close-menu-active");
  });

document.querySelector(".close-menu").addEventListener("click", (e) => {
  document.querySelector(".menu_mobile").classList.remove("active");
  document.querySelector(".close-menu").classList.remove("close-menu-active");
});

// Burger
body.addEventListener("click", (e) => {
  if (
    document.querySelector(".burger span").classList.contains("active") &&
    e.target !== menu_burger
  ) {
    document.querySelector(".burger span").classList.remove("active");
    document.querySelector(".menu-burger").classList.remove("animate");
  } else if (e.target === burger) {
    document.querySelector(".burger span").classList.add("active");
    document.querySelector(".menu-burger").classList.add("animate");
  }
});

const chooseType = document.getElementsByName("radio");
const permanentType = document.getElementById("permanent");
const temporaryType = document.getElementById("temporary");
const combinedType = document.getElementById("combined");
const amount = document.querySelectorAll(".tickets-content__btn-amount");
const adult = amount[0].querySelector(".tickets-content__number");
const senior = amount[1].querySelector(".tickets-content__number");
const totalText = document.querySelector(".tickets-content__total-price");
const prices = { permanent: 20, temporary: 25, combined: 40 };
const typeNumbers = { permanent: 1, temporary: 2, combined: 3 };
let myStorage = window.localStorage;
const decrementButtons = document.querySelectorAll(
  ".tickets-content__minus-btn"
);
const incrementButtons = document.querySelectorAll(
  ".tickets-content__plus-btn"
);
const submitForm = document.querySelector(".tickets-content__btn-buy-now");

for (let type of chooseType) {
  type.addEventListener("input", calculateTotal);
  type.addEventListener("click", calculateTotal);
}
for (let Data of amount) {
  Data.addEventListener("change", calculateTotal);
}

for (let minusBtn of decrementButtons) {
  minusBtn.addEventListener("click", calculateTotal);
}

for (let plusBtn of incrementButtons) {
  plusBtn.addEventListener("click", calculateTotal);
}

function checkType() {
  let type;
  if (permanentType.checked) {
    type = permanentType.value;
  } else if (temporaryType.checked) {
    type = temporaryType.value;
  } else {
    type = combinedType.value;
  }
  return type;
}

function getData() {
  let result = {
    basicQuantity: 0,
    seniorQuantity: 0,
  };
  result.basicQuantity = adult.value;
  result.seniorQuantity = senior.value;
  return result;
}

function calculateTotal() {
  type = checkType();
  Data = getData();
  let price = +prices[myStorage.getItem("ticketType")];
  let totalAmount = 0;
  totalAmount =
    +Data.basicQuantity * price + (+Data.seniorQuantity * price) / 2;
  totalText.textContent = "Total " + "€ " + totalAmount;
  function updateMyStorage() {
    myStorage.setItem("ticketType", type);
    myStorage.setItem("basicQuantity", adult.value);
    myStorage.setItem("seniorQuantity", senior.value);
    myStorage.setItem("totalAmount", totalAmount);
  }
  updateMyStorage();
}

function updateFromStorage() {
  let type = myStorage.getItem("ticketType");
  if (type === "permanent") {
    permanentType.checked = true;
  } else if (type === "temporary") {
    temporaryType.checked = true;
  } else {
    combinedType.checked = true;
  }

  totalText.textContent = "Total " + "€ " + myStorage.getItem("totalAmount");
  adult.value = myStorage.getItem("basicQuantity") || 1;
  senior.value = myStorage.getItem("seniorQuantity") || 1;
}
updateFromStorage();
window.addEventListener("load", updateFromStorage);

const formType = document.getElementById("ticket-type");
const formOverviewType = document.querySelector(".preview__type");
const typeText = {
  permanent: "Permanent exhibition",
  temporary: "Temporary exhibition",
  combined: "Combined Admission",
};
const DataWrapper = document.querySelector(".form__choose-number-tickets");
const formDatas = DataWrapper.querySelectorAll(".number");
const formDataBtns = DataWrapper.querySelectorAll("button");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const form = document.querySelector(".form__buy-tickets");

const formOvrviewDate = document.querySelector(".preview__date");
const formOvrviewTime = document.querySelector(".preview__time");
const overview = document.querySelector(".preview__amount-wrapper");
const formOverviewDatas = overview.querySelectorAll(".preview__amount");
const formOverviewBasicText = overview.querySelector(
  ".preview__amount-text-basic"
);
const formOverviewSeniorText = overview.querySelector(
  ".preview__amount-text-senior"
);
const formOverviewBasicAmount = overview.querySelector(".preview__basic");
const formOverviewSeniorAmount = overview.querySelector(".preview__senior");
const formOverviewTotalAmount = overview.querySelector(
  ".preview__total-number"
);

const formDate = document.getElementById("date");
const formTime = document.getElementById("time");

formDate.addEventListener("change", updateDate);

function updateDate() {
  formDate.classList.add("selected");
  let dateTicket = new Date(this.value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
  formOvrviewDate.textContent = dateTicket;
  myStorage.setItem("dateTicket", this.value);
  myStorage.setItem("ticketDate", dateTicket);
}

formType.addEventListener("change", storeType);

function storeType() {
  let typeNumber = formType.options.selectedIndex;
  let type;
  if (typeNumber === 1) {
    type = "permanent";
  } else if (typeNumber === 2) {
    type = "temporary";
  } else {
    type = "combined";
  }
  myStorage.setItem("ticketType", type);
  updateFormFromStorage();
  formCalculateTotal();
}

for (let btn of formDataBtns) {
  btn.addEventListener("click", changeFormData);
  btn.addEventListener("click", formCalculateTotal);
}

function changeFormData() {
  let result = {
    basicQuantity: 0,
    seniorQuantity: 0,
  };
  result.basicQuantity = formDatas[0].value;
  result.seniorQuantity = formDatas[1].value;
  return result;
}

function formCalculateTotal() {
  type = myStorage.getItem("ticketType");
  Data = changeFormData();
  let price = +prices[myStorage.getItem("ticketType")];
  let totalAmount = 0;
  let basciAmount = +Data.basicQuantity * price;
  formOverviewDatas[0].textContent = +Data.basicQuantity;
  formOverviewBasicText.textContent = `Basic (${price} €)`;
  formOverviewBasicAmount.textContent = `${basciAmount} €`;
  let seniorAmount = (+Data.seniorQuantity * price) / 2;
  formOverviewDatas[1].textContent = +Data.seniorQuantity;
  formOverviewSeniorText.textContent = `Senior (${price / 2} €)`;
  formOverviewSeniorAmount.textContent = `${seniorAmount} €`;
  totalAmount = basciAmount + seniorAmount;
  formOverviewTotalAmount.textContent = `${basciAmount + seniorAmount} €`;
  function updateMyStorage() {
    myStorage.setItem("ticketType", type);
    myStorage.setItem("basicQuantity", Data.basicQuantity);
    myStorage.setItem("seniorQuantity", Data.seniorQuantity);
    myStorage.setItem("totalAmount", totalAmount);
    myStorage.setItem("totalAmountText", `${basciAmount + seniorAmount} €`);
    myStorage.setItem("basicPrice", `Basic (${price} €)`);
    myStorage.setItem("seniorPrice", `Senior (${price / 2} €)`);
    myStorage.setItem("basicAmount", `${basciAmount} €`);
    myStorage.setItem("seniorAmount", `${seniorAmount} €`);
  }
  updateMyStorage();
}

submitForm.addEventListener("click", updateFormFromStorage);
submitForm.addEventListener("click", formCalculateTotal);

function updateFormFromStorage() {
  formType.options.selectedIndex = typeNumbers[myStorage.getItem("ticketType")];
  formOverviewType.textContent = typeText[myStorage.getItem("ticketType")];
  formDatas[0].value = myStorage.getItem("basicQuantity") || 1;
  formDatas[1].value = myStorage.getItem("seniorQuantity") || 1;
  formOverviewDatas[0].textContent = formDatas[0].value;
  formOverviewDatas[1].textContent = formDatas[1].value;
  formOvrviewDate.textContent = myStorage.getItem("ticketDate");
  formDate.value = myStorage.getItem("dateTicket");
  formDate.classList.add("selected");
  formOvrviewTime.textContent = myStorage.getItem("ticketTime");
  formTime.classList.add("selected");
  nameInput.value = myStorage.getItem("name");
  emailInput.value = myStorage.getItem("email");
  telInput.value = myStorage.getItem("tel");
  formOverviewDatas[0].textContent = myStorage.getItem("basicQuantity");
  formOverviewDatas[1].textContent = myStorage.getItem("seniorQuantity");
  formOverviewBasicText.textContent = myStorage.getItem("basicPrice");
  formOverviewBasicAmount.textContent = myStorage.getItem("basicAmount");
  formOverviewSeniorText.textContent = myStorage.getItem("seniorPrice");
  formOverviewSeniorAmount.textContent = myStorage.getItem("seniorAmount");
  formOverviewTotalAmount.textContent = myStorage.getItem("totalAmountText");
}

updateFormFromStorage();

function checkDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = `${today.getFullYear()}-${mm}-${dd}`;
  formDate.setAttribute("min", today);
}

formDate.addEventListener("focus", checkDate);

formTime.addEventListener("change", checkTime);

function updateTime() {
  formTime.classList.add("selected");
  let time = formTime.value;
  myStorage.setItem("ticketTime", time);
  formOvrviewTime.textContent = time;
}

function showError(node, message) {
  node.classList.add("error");
  let errorMessage = document.createElement("span");
  errorMessage.className = "allert";
  errorMessage.textContent = message;
  form.prepend(errorMessage);
  setTimeout(() => errorMessage.remove(), 5000);
}

function checkTime() {
  let time = formTime.value;
  let hours = +time.slice(0, 2);
  let minutes = +time.slice(3);
  if (hours > 18 || hours < 9 || (minutes !== 0 && minutes !== 30)) {
    showError(
      formTime,
      "Time should be between 9 and 6 in 30 minute increments "
    );
  } else if (hours <= 18 && hours >= 9 && (minutes === 0 || minutes === 30)) {
    formTime.classList.remove("error");
    updateTime();
  }
}

nameInput.addEventListener("blur", vallidName);

function vallidName() {
  let name = nameInput.value;
  checkNameSymbols();

  function checkNameSymbols() {
    let regExpRu = /\p{sc=Cyrillic}\s/gu;
    let regExp = /[a-zA-Z]\s/u;
    if (!regExp.test(name) && !regExpRu.test(name)) {
      showError(nameInput, "Latin and Cyrillic characters are allowed");
    } else if (regExp.test(name) || regExpRu.test(name)) {
      nameInput.classList.remove("error");
      checkNameLength();
    }
  }

  function checkNameLength() {
    if (name.length < 5 || name.length > 20) {
      showError(
        nameInput,
        "The length of the names must be in the range from 5 to 20 characters"
      );
    } else {
      nameInput.classList.remove("error");
      storeName();
    }
  }

  function storeName() {
    myStorage.setItem("name", nameInput.value);
  }
}

emailInput.addEventListener("blur", checkEmail);
emailInput.addEventListener("change", checkEmail);

function checkEmail() {
  let email = emailInput.value;
  let arr = email.split("@");
  let domain = arr[1];
  let username = arr[0];
  let domArr = domain.split(".");
  let firstDomain = domArr[0];
  let secondDomain = domArr[1];
  if (username.length < 5 || username.length > 20) {
    showError(emailInput, "email length must be between 5 and 20 characters");
  }
  if (
    username.length >= 3 &&
    username.length <= 15 &&
    firstDomain.length >= 4 &&
    secondDomain.length >= 2
  ) {
    if (emailInput.classList.contains("error")) {
      emailInput.classList.remove("error");
    }
    storeEmail();
  }
}

function storeEmail() {
  myStorage.setItem("email", emailInput.value);
}

telInput.addEventListener("blur", checkTel);
telInput.addEventListener("change", checkTel);

function storeTel() {
  myStorage.setItem("tel", telInput.value);
}

function checkTel() {
  let tel = telInput.value;
  let regExp = /^([0-9\s-]{3,14})$/i;
  if (!regExp.test(tel)) {
    showError(telInput, "separation is done by spaces and hyphen");
  } else if (regExp.test(tel)) {
    telInput.classList.remove("error");
    storeTel();
  }
}

const muteIco = document.querySelector(".mute-btn-ico");
const fullscreenBtn = document.querySelector(".full-screen-btn");
const fullscreenBtnIco = document.querySelector(".fullscreen-btn-ico");
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");
const videoWrapper = document.querySelector(".video-wrapper");
const bigVideo = document.querySelector(".big-video");
const smallPlayButton = document.querySelector(".small-play-btn-ico");
const videoControls = document.querySelector(".video-controls");
const play = document.querySelector(".small-play-btn");
const bigPlayBtn = document.querySelector(".big-play-btn");
const mute = document.querySelector(".mute-btn");

volumeBar.addEventListener("change", setVolme);
volumeBar.addEventListener("click", changeVolume);
volumeBar.addEventListener("mousemove", (e) => mousedown && changeVolume(e));
volumeBar.addEventListener("mousedown", () => (mousedown = true));
volumeBar.addEventListener("mouseup", () => (mousedown = false));

let mousedown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));
document.addEventListener("keydown", keyHandle, false);
fullscreenBtn.addEventListener("click", function (e) {
  handleFullscreen();
});

bigPlayBtn.addEventListener("click", playPauseMedia);
play.addEventListener("click", playPauseMedia);
mute.addEventListener("click", muteVideo);
bigVideo.addEventListener("timeupdate", setProgress);
progressBar.addEventListener("change", setProgress);

bigVideo.removeAttribute("controls");
muteIco.setAttribute("src", "./assets/img/svg/volume.png");
bigVideo.volume = 0.5;

function muteVideo() {
  if (bigVideo.muted) {
    muteIco.setAttribute("src", "./assets/img/svg/volume.png");
    bigVideo.muted = false;
    bigVideo.volume = 0.5;
  } else {
    muteIco.setAttribute("src", "./assets/img/svg/video-controls/mute.png");
    bigVideo.volume = 0;
    bigVideo.muted = true;
  }
  setVolme();
}

function setVolme() {
  let barVolume = bigVideo.volume * 100;
  volumeBar.value = barVolume;
  volumeBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${barVolume}%, #C4C4C4 ${barVolume}%, #C4C4C4 100%)`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * bigVideo.duration;
  bigVideo.currentTime = scrubTime;
  progressBar.setAttribute("value", `${Math.floor(scrubTime)}`);
}

function setProgress(e) {
  let progress = Math.floor((this.currentTime / this.duration) * 100);
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress}%, #C4C4C4 ${progress}%, #C4C4C4 100%)`;
}

function handleFullscreen() {
  if (!!document.webkitIsFullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  } else {
    if (videoWrapper.requestFullscreen) {
      videoWrapper.requestFullscreen();
    } else if (videoWrapper.webkitRequestFullScreen) {
      videoWrapper.webkitRequestFullScreen();
    }
  }
  updateFullscreenHud();
}

function playPauseMedia() {
  if (bigVideo.paused || bigVideo.ended) {
    bigVideo.play();
    bigPlayBtn.style.opacity = 0;
    smallPlayButton.setAttribute(
      "src",
      "./assets/img/svg/video-controls/pause.png"
    );
  } else {
    bigPlayBtn.style.opacity = 0.9;
    smallPlayButton.setAttribute("src", "./assets/img/svg/play.png");
    bigVideo.pause();
  }
}

function keyHandle(e) {
  switch (e.code) {
    case "Space":
    case "KeyK":
      e.preventDefault();
      playPauseMedia(e);
      break;
    case "KeyF":
      handleFullscreen();
      break;
    case "KeyM":
      muteVideo();
      break;
    case "ArrowDown":
      keyChangeVolume("down");
      break;
    case "ArrowUp":
      keyChangeVolume("up");
      break;
    case "ArrowLeft":
    case "KeyJ":
      keySkip("backward");
      break;
    case "ArrowRight":
    case "KeyL":
      keySkip("forward");
      break;
    case e.shiftKey && "Comma":
      changePaybackRate("slower");
      break;
    case e.shiftKey && "Period":
      changePaybackRate("faster");
      break;
  }
}

function updateFullscreenHud() {
  if (document.fullscreenElement) {
    fullscreenBtnIco.setAttribute("src", "./assets/img/svg/fullScreensvg.svg");
  } else if (document.fullscreenElement !== 0) {
    fullscreenBtnIco.setAttribute(
      "src",
      "/assets/img/svg/video-controls/fullscreen_exit.png"
    );
  }
}

function changeVolume(e) {
  let currentVolume = (e.offsetX / volumeBar.offsetWidth).toFixed(2);
  if (currentVolume > 1) {
    currentVolume = 1;
  } else if (currentVolume <= 0) {
    currentVolume = 0;
    muteVideo();
  }
  bigVideo.volume = currentVolume;
  setVolme();
}

function keyChangeVolume(direction) {
  if (direction === "down") {
    try {
      if (bigVideo.volume > 0) {
        bigVideo.volume -= 0.1;
        setVolme();
      } else if (bigVideo.volume === 0.1) {
        muteVideo();
        bigVideo.volume = 0;
      }
    } catch {
      if (bigVideo.volume <= 0) {
        bigVideo.volume = 0;
      }
    }
  } else if (direction === "up") {
    try {
      if (bigVideo.volume < 1) {
        bigVideo.volume += 0.1;
        setVolme();
      } else if (bigVideo.volume === 0) {
        muteVideo();
        bigVideo.volume += 0.1;
      }
    } catch {
      if (bigVideo.volume === 1) {
        bigVideo.volume = 1;
      }
    }
  }
  setVolme();
}

function changePaybackRate(direction) {
  if (direction === "slower") {
    try {
      if (bigVideo.playbackRate > 0.25) {
        bigVideo.playbackRate -= 0.25;
      } else if (bigVideo.playbackRate === 0.25) {
        bigVideo.pause();
      }
    } catch {
      if (bigVideo.playbackRate === 0) {
        bigVideo.playbackRate += 0.25;
      }
    }
  } else if (direction === "faster") {
    try {
      if (bigVideo.playbackRate > 0 && bigVideo.playbackRate < 2) {
        bigVideo.playbackRate += 0.25;
      } else if (bigVideo.playbackRate === 2) {
        bigVideo.playbackRate = 2;
      }
    } catch {
      if (bigVideo.playbackRate < 0 || bigVideo.playbackRate > 2) {
        bigVideo.playbackRate = 2;
      }
    }
  }
}

function keySkip(direction) {
  if (direction === "backward") {
    try {
      if (bigVideo.currentTime > 0) {
        bigVideo.currentTime -= 10;
      }
    } catch {
      if (bigVideo.currentTime <= 10) {
        bigVideo.currentTime = 0;
      }
    }
  } else if (direction === "forward") {
    try {
      if (bigVideo.currentTime < bigVideo.duration) {
        bigVideo.currentTime += 10;
      }
    } catch {
      if (bigVideo.currentTime >= bigVideo.duration) {
        bigVideo.currentTime = bigVideo.duration;
      }
    }
  }
}

bigVideo.setAttribute("poster", `./assets/img/svg/video-controls/Poster.svg`);

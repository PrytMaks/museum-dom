const progress = document.querySelector(".video__control_time-bar");
const soundProg = document.querySelector(".video__control_sound-bar");

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
});

soundProg.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right,  #710707 0%,  #710707 ${value}%, #fff ${value}%, white 100%)`
});

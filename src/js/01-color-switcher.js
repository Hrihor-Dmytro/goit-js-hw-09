function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

// console.log(buttonStart);
// console.log(buttonStop);
let bodyCol = null;
buttonStart.addEventListener('click', () => {
  bodyCol = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
});
buttonStop.addEventListener('click', () => {
  clearInterval(bodyCol);
  buttonStop.disabled = true;
  buttonStart.disabled = false;
});

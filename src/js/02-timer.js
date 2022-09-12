import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

startBtn.addEventListener('click', onButtonClick);
inputEl.addEventListener('input', onInputClick);

let intervalId = null;
const timer = {
  start() {
    const startTime = userSelectedDate;
    startBtn.disabled = true;
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime.getTime() - currentTime;
      if (deltaTime <= 0) {
        timer.stop;
        return;
      }
      const time = convertMs(deltaTime);
      updateClockFace(time);
    }, 1000);
  },
  stop() {
    clearInterval(intervalId);
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let userSelectedDate = 0;

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

const flatpick = flatpickr('#datetime-picker', { ...options });

function onInputClick() {
  if (options.defaultDate > flatpick.selectedDates[0]) {
    Notiflix.Notify.failure('Please, choose a date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
    userSelectedDate = flatpick.selectedDates[0];
  }
}

function onButtonClick() {
  timer.start();
  startBtn.disabled = true;
}

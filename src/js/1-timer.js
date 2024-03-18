import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

const inputDateTimePicker = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.timer .value');

let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkValidData();
  },
};
flatpickr(inputDateTimePicker, options);

function checkValidData() {
  if (!userSelectedDate || userSelectedDate <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    btnStart.disabled = true;
  } else {
    btnStart.disabled = false;
    iziToast.success({
      title: 'Success',
      message: 'Correct date',
    });
  }
}

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

function updateTimer() {
  const now = new Date();
  const msDifference = userSelectedDate - now;
  if (msDifference <= 0) {
    clearInterval(countdownInterval);
    timerFields.forEach(field => (field.textContent = '00'));
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(msDifference);
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

btnStart.addEventListener('click', e => {
  btnStart.disabled = true;
  inputDateTimePicker.disabled = true;
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

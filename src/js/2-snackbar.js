import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = this.elements.delay;
  const delay = parseInt(delayInput.value);

  const stateInput = this.querySelector('input[name="state"]:checked');
  const state = stateInput ? stateInput.value : null;

  if (!state) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state',
      position: 'topRight',
    });
    return;
  }

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  event.currentTarget.reset();
}

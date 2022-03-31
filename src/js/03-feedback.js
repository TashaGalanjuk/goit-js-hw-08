import throttle from 'lodash.throttle';

const storage = 'feedback-form-state';
const userData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

// Перевіряємо наявність даних у сховищі, заповнюємо форму
function initForm() {
  let persistedFilters = localStorage.getItem(storage);
  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}

// Записуємо вхідні дані з input в сховище
function onFormInput(event) {
    const formData = new FormData(form);
    formData.forEach((value, name) => {
        userData[name] = value;
        localStorage.setItem(storage, JSON.stringify(userData));
    });
};

// // При сабміті виводимо дані в консоль і очищуємо сховище та форму
function onFormSubmit(event) {
    event.preventDefault();
    const userLocalData = JSON.parse(localStorage[storage]);
    console.log(userLocalData);
    localStorage.clear();
    form.email.value = "";
    form.message.value = "";
};


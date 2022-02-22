import throttle from 'lodash.throttle';

const refs = {
    feedbackForm: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector("input"),
    inputMessage: document.querySelector("textarea"),
    userSubmit: document.querySelector("button"),
};

const storage = 'feedback-form-state';
const userData = {};

// Перевіряємо наявність даних у сховищі, заповнюємо форму
if (localStorage[storage]) {
    const userLocalData = JSON.parse(localStorage[storage]);
    refs.inputEmail.value = userLocalData.email;
    refs.inputMessage.value = userLocalData.message || '';
};

// Записуємо вхідні дані з input в сховище з затримкою
refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));
function onFormInput(event) {
    const formData = new FormData(refs.feedbackForm);
    formData.forEach((value, name) => {
        userData[name] = value;
        localStorage.setItem(storage, JSON.stringify(userData));
    });
};

// При сабміті виводимо дані в консоль і очищуємо сховище та форму
refs.feedbackForm.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
    event.preventDefault();
    const userLocalData = JSON.parse(localStorage[storage]);
    console.log(userLocalData);
    localStorage.clear();
    refs.inputEmail.value = "";
    refs.inputMessage.value = "";
};


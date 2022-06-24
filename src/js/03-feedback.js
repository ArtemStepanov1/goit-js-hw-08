import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input[name="email"]');
const inputMessage = document.querySelector('textarea[name="message"]');
let formData = {};

populateInput();

form.addEventListener('input', throttle(setMessageToLocal, 500));
form.addEventListener('submit', resetAndSubmitForm);

function validForm() {
   let valid = true;
   if(inputEmail.value === "" || inputMessage.value === "") {
      valid = false;
   }
   return valid;
}

function resetAndSubmitForm(e) {
   e.preventDefault();
   if(validForm()){   
      const objSubmit = JSON.parse(localStorage.getItem(STORAGE_KEY));
      console.log(objSubmit);
      localStorage.removeItem(STORAGE_KEY);
      formData = {};
      form.reset();
      return ;
   } else {
      Notiflix.Notify.info('Необходимо заполнить все поля формы');
   }
}

function setMessageToLocal(e) {
   const message = e.target.value;

   formData[e.target.name] = message;
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInput() {
   const savedMessage = localStorage.getItem(STORAGE_KEY);
   const obj = JSON.parse(savedMessage);
   if (savedMessage) {
      if (obj.email) {
         inputEmail.value = obj.email;
      }
      if (obj.message) {
         inputMessage.value = obj.message;
		}
		formData = obj;
   }
}
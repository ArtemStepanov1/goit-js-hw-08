import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input[name="email"]');
const inputMessage = document.querySelector('textarea[name="message"]');
let formData = {};

populateInput();

form.addEventListener('input', throttle(setMessageToLocal, 500));
form.addEventListener('submit', resetAndSubmitForm);

function resetAndSubmitForm(e) {
		e.preventDefault();
		const objSubmit = JSON.parse(localStorage.getItem(STORAGE_KEY))
	console.log(objSubmit);
	localStorage.removeItem(STORAGE_KEY);
	formData = {};
   form.reset();
}

function setMessageToLocal(evt) {
   const message = evt.target.value;

   formData[evt.target.name] = message;
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
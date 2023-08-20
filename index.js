const form = document.querySelector('form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submit');

const emailError = document.querySelector('#email + span.error');

function showError() {
    if (email.validity.valueMissing) {
		emailError.textContent = "You need to enter an email address.";
	} else if (email.validity.typeMismatch) {
		emailError.textContent = "Entered value needs to be an email address.";
	} else if (email.validity.tooShort) {
		emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
	}

	// Set the styling appropriately
	emailError.className = "error active";
}

email.addEventListener('input', (event) => {
    if (email.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
    } else {
        showError();
    }
});

form.addEventListener('submit', (event) => {
	if (!email.validity.valid) {
		showError();
		event.preventDefault();
	}
});
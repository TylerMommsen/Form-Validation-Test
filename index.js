const form = document.querySelector('form');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submit');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const emailError = document.querySelector('#email + span.error');
const zipError = document.querySelector('#zip + span.error');
const passwordError = document.querySelector('#password + span.error');
const passwordConfirmError = document.querySelector('#password-confirm + span.error');

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

function checkZIP() {
    // For each country, defines the pattern that the ZIP has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };
  
    // Read the country id
    const country = document.getElementById("country").value;
  
    // Get the NPA field
    const ZIPField = document.getElementById("zip");
  
    // Build the constraint checker
    const constraint = new RegExp(constraints[country][0], "");
    console.log(constraint);
  
    if (constraint.test(ZIPField.value)) {
        // The ZIP follows the constraint, we use the ConstraintAPI to tell it
        zipError.textContent = '';
        zipError.className = 'error';
    } else {
        // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
        // give a message about the format required for this country
        zipError.textContent = constraints[country][1];
        zipError.className = 'error active';
        // ZIPField.setCustomValidity(constraints[country][1]);
    }
}

window.onload = () => {
    document.getElementById("country").onchange = checkZIP;
    document.getElementById("zip").oninput = checkZIP;
};

email.addEventListener('input', (event) => {
    if (email.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
    } else {
        showError();
    }
});

password.addEventListener('input', (event) => {
    const password = document.getElementById('password').value;
    if (password.length < 8 || password.length > 30) {
        passwordError.textContent = 'Password must be between 8-30 characters.';
        passwordError.className = 'error active';
    } else {
        passwordError.textContent = '';
        passwordError.className = 'error';
    }
});

passwordConfirm.addEventListener('input', (event) => {
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    if (password !== passwordConfirm) {
        passwordConfirmError.textContent = 'Passwords need to match';
        passwordConfirmError.className = 'error active';
    } else {
        passwordConfirmError.textContent = '';
        passwordConfirmError.className = 'error';
    }
});

form.addEventListener('submit', (event) => {
	if (!email.validity.valid) {
		showError();
		event.preventDefault();
	}
});
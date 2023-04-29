console.log("signup.js file loaded.");
// import * as db from "./db.js";
// import { query } from './db.js';

function redirectToSuccess() {
  window.location.href = "/";
}

const form = document.querySelector('#signup-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = form.elements.username.value;
  const password = form.elements.password.value;

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // If the signup was successful, display a success message
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Signup successful!';
      form.insertAdjacentElement('beforeend', successMessage);
      // Redirect to success page
      window.location.href = "/";
    } else {
      console.error(data); // Display error message to console
    }    
  } catch (error) {
    console.error(error);
  }
});

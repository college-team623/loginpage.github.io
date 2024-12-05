document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userType = document.querySelector('input[name="options"]:checked').value;
  const errorMessage = document.getElementById('responseMessage');

  if (email === '' || password === '' || !userType) {
    errorMessage.textContent = 'All fields are required.';
    return;
  }

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, userType })
  })
  .then(response => {
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      return response.text();
    }
  })
  .then(message => {
    if (message) {
      errorMessage.textContent = message;
    }
  })
  .catch(error => console.error('Error:', error));
});

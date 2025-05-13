let current = 0;
const questions = document.querySelectorAll('.question');

function showQuestion(index) {
  questions.forEach((q, i) => {
    q.classList.remove('active', 'up');
    if (i === index) {
      q.classList.add('active');
    } else if (i < index) {
      q.classList.add('up');
    }
  });
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion(current);
  } else {
    submitForm(); // Automatically submit if it's the last question
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    showQuestion(current);
  }
}

function showAlert(message) {
  const alertBox = document.getElementById('customAlert');
  alertBox.textContent = message;
  alertBox.classList.add('show');

  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 3000); // Hide after 3 seconds
}

function submitForm() {
  const name = document.getElementById('q1').value.trim();
  const email = document.getElementById('q2').value.trim();
  const reason = document.getElementById('q3').value.trim();

  if (!name) {
    showAlert('Prosím, zadajte svoje meno.');
    current = 0;
    showQuestion(current);
    return;
  }

  if (!email) {
    showAlert('Prosím, zadajte svoj e-mail.');
    current = 1;
    showQuestion(current);
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert('Zadajte platný e-mail.');
    current = 1;
    showQuestion(current);
    return;
  }

  if (!reason) {
    showAlert('Prosím, povedzte nám, prečo sa chcete pridať.');
    current = 2;
    showQuestion(current);
    return;
  }
  

  // If all passed, you can proceed here
  showAlert('Ďakujeme za odoslanie!');
  console.log({ name, email, reason });

  // Here you could send data to a server
  // or redirect to a thank-you page
}

// Event listener to allow submitting the form with the Enter key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior (like submitting the form)
    nextQuestion(); // Call nextQuestion() when Enter is pressed
  }
});

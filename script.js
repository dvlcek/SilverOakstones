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
  const data = {};
  for (let i = 1; i <= 13; i++) {
    const el = document.getElementById('q' + i);

    if (!el) continue;

    // Handle radio groups
    if (i === 7 || i === 11 || i === 13) {
      const selected = el.querySelector('input[type="radio"]:checked');
      if (!selected) {
        current = i - 1;
        showQuestion(current);
        showAlert(`Vyberte prosím možnosť pre otázku č. ${i}.`);
        return;
      }
      data[`q${i}`] = selected.value;
    }
    // Handle text inputs/areas
    else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (!el.value.trim()) {
        current = i - 1;
        showQuestion(current);
        showAlert(`Vyplňte prosím otázku č. ${i}.`);
        return;
      }
      data[`q${i}`] = el.value.trim();
    }
  }

  showAlert('Ďakujeme za odoslanie!');
  console.log('Odoslané údaje:', data);

  // Tu môžete poslať dáta na server alebo zobraziť ďakovnú stránku
}

// Event listener to allow submitting the form with the Enter key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior (like submitting the form)
    nextQuestion(); // Call nextQuestion() when Enter is pressed
  }
});

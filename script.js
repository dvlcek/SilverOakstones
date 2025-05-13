let current = 0;
const questions = document.querySelectorAll('.question');

function showQuestion(index, direction = 'down') {
  questions.forEach((q, i) => {
    q.classList.remove('active', 'up');
    if (i === index) {
      q.classList.add('active');
    } else if (i < index) {
      q.classList.add('up'); // above the current one
    }
  });
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion(current);
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    showQuestion(current, 'up');
  }
}

function submitForm() {
  const name = document.getElementById('q1').value;
  const email = document.getElementById('q2').value;
  const reason = document.getElementById('q3').value;

  console.log({ name, email, reason });

  alert('Ďakujeme za odoslanie!');
}

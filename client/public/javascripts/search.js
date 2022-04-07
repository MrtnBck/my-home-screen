const submit = document.getElementById('btn-search');
const input = document.getElementById('search-bar');
const error = document.getElementById('error-container');

submit.addEventListener('click', (e) => {
  const inputValue = document.getElementById('search-bar').value;
  if (inputValue === '') {
    e.preventDefault();
    console.log('search bar is blank');
  } else {
    window.location = 'https://www.google.com/search?q=' + inputValue;
  }
});

input.addEventListener('keyup', (e) => {
  const inputValue = document.getElementById('search-bar').value;
  if (e.key === 'Enter' && inputValue !== '') {
    window.location = 'https://www.google.com/search?q=' + inputValue;
  }
  if (inputValue === '') {
    console.log('search bar is blank');
  }
});

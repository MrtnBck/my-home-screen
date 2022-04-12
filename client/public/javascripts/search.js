const submit = document.getElementById('btn-search');
const inputSearch = document.getElementById('search-bar');
const error = document.getElementById('error-container');

submit.addEventListener('click', (e) => {
  const inputSearchValue = document.getElementById('search-bar').value;
  if (inputSearchValue === '') {
    e.preventDefault();
    console.log('search bar is blank');
  } else {
    window.location = 'https://www.google.com/search?q=' + inputSearchValue;
  }
});

inputSearch.addEventListener('keyup', (e) => {
  const inputSearchValue = document.getElementById('search-bar').value;
  if (e.key === 'Enter' && inputSearchValue !== '') {
    window.location = 'https://www.google.com/search?q=' + inputSearchValue;
  }
  if (e.key === 'Enter' && inputSearchValue === '') {
    console.log('search bar is blank');
  }
});

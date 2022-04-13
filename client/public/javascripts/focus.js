const inputFocus = document.getElementById('focus-bar');

/*  */

inputFocus.addEventListener('keyup', (e) => {
  const inputFocusValue = document.getElementById('focus-bar').value;
  if (e.key === 'Enter' && inputFocusValue !== '') {
    setwithExpiry('focus', inputFocusValue);
    /* localStorage.setItem('focus', inputFocusValue); */
  } else if (e.key === 'Enter' && inputFocusValue === '') {
    console.log('focus bar is blank');
  }
});

const setwithExpiry = (key, value) => {
  const end = new Date();

  const item = {
    value: value,
    /* This makes a time stamp in milliseconds that have passed since January 1, 1970, UTC+00 */
    expiry: end.setUTCHours(30, 59, 59, 999),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
  const focusStr = localStorage.getItem('focus');
  if (!focusStr) {
    return null;
  }
  const focus = JSON.parse(focusStr);
  const now = new Date();
  //getTime() return with UTC+offset, adding +2hours in millisec to the time stamp to become UTC+00
  if (now.getTime() + 7200000 > focus.expiry) {
    localStorage.removeItem('focus');
    return null;
  }
  document.getElementById('focus-bar').value = focus.value;
  focus.value;
};

getWithExpiry('focus');

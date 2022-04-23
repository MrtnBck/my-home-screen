const noteEl = document.getElementById('note');
const openBtn = document.getElementById('notes-open');
let textArea, closeBtn, saveBtn, changeNoteEl, changeBtns;
//addBtn

const texts = ['Note-0', 'Note-1', 'Note-2', 'Note-3', 'Note-4'];

openBtn.addEventListener('click', () => {
  openBtn.classList.add('slide-off-btn');
  setTimeout(function () {
    noteEl.innerHTML = `
      <div class="notes-container">
      <div class="notes-outer">
      
      </div>
      <div class="notes-main-container">
          <div class="control-note-btns">
              <button class="btn" id="save"><i class="fa-solid fa-floppy-disk"></i></button>
              <button class="btn" id="remove"><i class="fa-solid fa-trash-can"></i></button>
              <button class="btn" id="notes-close"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <textarea id="note-area"></textarea>
          </div>
      </div>`;

    textArea = document.getElementById('note-area');
    closeBtn = document.getElementById('notes-close');
    removeBtn = document.getElementById('remove');
    saveBtn = document.getElementById('save');
    changeNoteEl = document.querySelector('.notes-outer');
    drawChangeBtns(5);
    textArea.value = getText(0);

    saveBtn.addEventListener('click', () => {
      const idx = getActiveBtn();
      setText(idx, textArea.value);
    });

    removeBtn.addEventListener('click', () => {
      const idx = getActiveBtn();
      setText(idx, '');
      textArea.value = '';
    });

    closeBtn.addEventListener('click', () => {
      const notesContainer = document.querySelector('.notes-container');
      notesContainer.classList.add('slide-off');
      setTimeout(function () {
        notesContainer.remove();
        openBtn.classList.remove('slide-off-btn');
      }, 500);
    });
  }, 500);
});

const getActiveBtn = () => {
  for (const [idx, btn] of changeBtns.entries()) {
    if (btn.classList.contains('active')) {
      return idx;
    }
  }
};

const setText = (idx, text) => {
  if (idx === undefined) {
    console.log(idx);
    localStorage.setItem('notes', JSON.stringify(texts));
  } else {
    texts[idx] = text;
    localStorage.setItem('notes', JSON.stringify(texts));
  }
};

const getText = (idx) => {
  const texts = JSON.parse(localStorage.getItem('notes'));
  if (localStorage.getItem('notes') !== null) {
    return texts[idx];
  } else {
    localStorage.setItem('notes', JSON.stringify(texts));
    console.log('asdasd');
    return texts[0];
  }
};

const drawChangeBtns = (qty) => {
  for (let i = 0; i < qty; i++) {
    const changeBtn = document.createElement('button');
    changeBtn.classList.add('btn', 'btn-change');
    if (i === 0) {
      changeBtn.classList.add('active');
    }
    changeBtn.id = `change-${i}`;
    changeBtn.innerHTML = '<i class="fa-solid fa-note-sticky"></i>';
    changeBtn.addEventListener('click', () => {
      textArea.value = changeNote(changeBtn, i);
    });
    changeNoteEl.appendChild(changeBtn);
  }
  changeBtns = document.querySelectorAll('.btn-change');
};

const changeNote = (btn, idx) => {
  manageActiveClass(btn);
  return getText(idx);
};

const manageActiveClass = (btn) => {
  changeBtns.forEach((btn) => {
    btn.classList.remove('active');
  });
  btn.classList.add('active');
};

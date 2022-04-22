const noteEl = document.getElementById('note');
const openBtn = document.getElementById('notes-open');
let textArea, closeBtn, saveBtn, changeNoteEl, changeBtns;
//addBtn

const texts = ['0', '1', '2', '3', '4'];

openBtn.addEventListener('click', () => {
  noteEl.innerHTML = `
    <div class="notes-container">
    <div class="notes-outer">
    
    </div>
    <div class="notes-main-container">
        <div class="control-note-btns">
            <button class="btn" id="save">S</button>
            <button class="btn" id="remove"><i class="fa-solid fa-trash-can"></i></button>
            <button class="btn" id="notes-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <textarea id="note-area"></textarea>
        </div>
    </div>`;
  textArea = document.getElementById('note-area');
  closeBtn = document.getElementById('notes-close');
  removeBtn = document.getElementById('remove');
  //addBtn = document.getElementById('add');
  saveBtn = document.getElementById('save');
  changeNoteEl = document.querySelector('.notes-outer');
  drawChangeBtns(5);
  textArea.value = getText(0);

  saveBtn.addEventListener('click', () => {
    console.log(getActiveBtn());
  });
});

const getActiveBtn = () => {
  changeBtns.forEach((btn, idx) => {
    //console.log(btn);
    if (btn.classList.contains('active')) {
      console.log(idx);
      return idx;
    } else {
      return false;
    }
  });
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
  if (idx === undefined) {
    return texts;
  } else {
    return texts[idx];
  }
};

const drawChangeBtns = (qty) => {
  for (let i = 0; i < qty; i++) {
    const changeBtn = document.createElement('button');
    changeBtn.classList.add('btn', 'btn-change');
    changeBtn.id = `change-${i}`;
    changeBtn.innerHTML = '<i class="fa-solid fa-note-sticky"></i>';
    changeBtn.addEventListener('click', () => {
      textArea.value = changeNote(changeBtn, i);
      //console.log('clicked');
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

const input = document.querySelector(".input");
const form = document.querySelector(".form");
const ul = document.querySelector(".ul");
const deleteDone = document.querySelector(".deleteDone");
const deleteAll = document.querySelector(".deleteAll");
const hidden = document.querySelector(".main__content");
let arr = JSON.parse(localStorage.getItem("todo")) ?? [];

// Создание объекта массива из значения инпута

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (input.value.trim().length) {
    arr.push({
      id: Date.now(),
      text: input.value,
      isDone: false,
    });
  }
  input.value = "";
  input.focus();
  ul.innerHTML = "";
  draw();
});

// Отрисовка тудушки

function drawTasks(obj) {
  const li = document.createElement("li");
  li.innerHTML = `<input class="check" type="checkbox">
                  <span>${obj.text}</span>
                  <button class="btn btn__delete">❌</button>`;

  const chk = li.querySelector(".check");
  const del = li.querySelector(".btn__delete");

  chk.checked = obj.isDone;

  chk.addEventListener("change", () => toggleIsDone(obj.id)); // событие чекбокса
  del.addEventListener("click", () => delTask(obj.id)); // событие удаления задачки
  return li;
}

// Функция отрисовки (+ добавление класса hidden, если arr.length > 0)

function draw() {
  ul.innerHTML = "";
  arr.forEach((obj) => {
    ul.appendChild(drawTasks(obj));
  });
  if (arr.length > 0) {
    hidden.classList.add("hidden");
  } else {
    hidden.classList.remove("hidden");
  }
  saveArrToLocalStorage(arr);
}

// Функция удаления задачки по id с помощью button(крестик)

function delTask(id) {
  arr = arr.filter((obj) => obj.id !== id);
  draw();
}

// Функция изменения значения isDone по нажатию на чекбокс (+ стилизация span)

function toggleIsDone(id) {
  const elem = arr.find((elem) => elem.id === id);
  if (elem) {
    elem.isDone = !elem.isDone;
  }
  draw();
}

// Функция удаления выполненных задачек с помощью button("Удалить завершенные")

deleteDone.addEventListener("click", deleteIsDone);
function deleteIsDone() {
  arr = arr.filter((item) => item.isDone !== true);
  draw();
}

// Функция удаления все задачек с помощью button("Удалить все")

deleteAll.addEventListener("click", clearArr);
function clearArr() {
  arr = [];
  ul.innerHTML = "";
  hidden.classList.remove("hidden");
  draw();
}

// Функция сохранения массива в localStorage

function saveArrToLocalStorage(arr) {
  localStorage.setItem("todo", JSON.stringify(arr));
}

draw();

const btnEl = document.querySelector("#btn-form");
const modalEl = document.querySelector(".modal");
const formEl = document.querySelector(".form");
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  return {
    title: this.title,
    author: this.author,
    pages: this.pages,
    alreadyRead: this.read,
  };
}

function addBookToLibrary(title, author, page, read) {
  const newBook = new Book(title, author, page, read);
  myLibrary.push(newBook);
}

addBookToLibrary("1984", "George orwell", 328, false);

function handleAddBookToUi() {
  const listEl = document.querySelector("ul");

  const fragment = document.createDocumentFragment();

  listEl.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const liEl = document.createElement("li");

    const h3El = document.createElement("h3");
    const strongEl = document.createElement("strong");
    const spanEl = document.createElement("span");
    const wrapperEl = document.createElement("div");
    const btnEl = document.createElement("button");
    const deleteBtnEl = document.createElement("button");

    liEl.classList.add("listItem");
    wrapperEl.classList.add("listItemWrapper");

    h3El.textContent = book.title;
    strongEl.textContent = book.author;
    spanEl.textContent = book.pages;
    btnEl.textContent = book.alreadyRead ? "🫡" : "😒";
    deleteBtnEl.textContent = "❌";
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.setAttribute("data-id", index);

    wrapperEl.append(strongEl, spanEl);
    liEl.append(h3El, wrapperEl, deleteBtnEl, btnEl);

    btnEl.addEventListener("click", () => {
      book.alreadyRead = !book.alreadyRead;

      btnEl.textContent = book.alreadyRead ? "🫡" : "😒";
      handleAddBookToUi();
    });

    fragment.appendChild(liEl);
  });

  listEl.appendChild(fragment);
}

handleAddBookToUi();

function hideModal() {
  if (modalEl.classList.contains("hidden")) {
    modalEl.classList.add("modal-show");
    modalEl.classList.remove("hidden");
  } else {
    modalEl.classList.add("hidden");
    modalEl.classList.remove("modal-show");
  }
}

btnEl.addEventListener("click", () => {
  hideModal();
});

modalEl.addEventListener("click", (e) => {
  const { currentTarget, target } = e;

  if (target.contains(currentTarget)) {
    hideModal();
  }
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("page");
  const read = formData.get("read") ? true : false;
  addBookToLibrary(title, author, pages, read);

  formEl.reset();
  hideModal();
  handleAddBookToUi();
});

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-id");
    myLibrary.splice(index, 1);
    handleAddBookToUi();
  });
});

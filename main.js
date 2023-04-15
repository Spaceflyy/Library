/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
const submitButton = document.getElementById("subBtn");
const form = document.getElementById("myForm");
const appendTo = document.querySelector(".bookContainer");
const bookbtn = document.querySelector(".addBookBtn");
const addForm = document.querySelector(".addBookForm");
const closeBtn = document.querySelector("#closeBtn .icon");
const bookBtnHeader = document.querySelector(".header button");
const formBackground = document.querySelector(".formBackground");

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    if (this.read == "Not Read") {
      this.read = "Read";
    } else {
      this.read = "Not Read";
    }
  }
}

function handleForm(event) {
  event.preventDefault();
}

function showAddMenu() {
  form.reset();
  if (addForm.style.display == "none" || addForm.style.display == "") {
    addForm.style.display = "block";
    formBackground.style.display = "block";
  } else {
    addForm.style.display = "none";
    formBackground.style.display = "none";
  }
}

function addBookToLibrary() {
  const title = capitalizeWord(document.querySelector("#title").value);
  const author = capitalizeWord(document.querySelector("#auth").value);
  const pages = document.querySelector("#pages").value;
  const read = document.getElementById("read").checked ? "Read" : "Not Read";

  if (title !== "" || author !== "" || pages !== "") {
    bookbtn.style.display = "none";
    const book = new Book([title], [author], [pages], [read]);
    myLibrary.push(book);
    createCard(book);
  }
}

function createCard(book) {
  // Create card elements
  const card = document.createElement("div");
  const closeBtnParent = document.createElement("div");
  const closeBtnCard = document.createElement("IMG");
  const readIcon = document.createElement("IMG");
  const infoContainer = document.createElement("div");
  const line = document.createElement("div");

  let bookInfo;
  // Add classes to card elements
  infoContainer.classList.add("cardInfoContainer");
  line.classList.add("line");
  card.classList.add("bookCard");
  closeBtnCard.classList.add("icon");
  readIcon.classList.add("icon");

  // Set attributes for cards
  closeBtnParent.setAttribute("id", "closeBtn");
  if (book.read == "Not Read") {
    readIcon.setAttribute("src", "./icons/read.svg");
    card.classList.add("notRead");
  } else {
    readIcon.setAttribute("src", "./icons/unread.svg");
    card.classList.add("read");
  }

  closeBtnCard.setAttribute("src", "./icons/delete.svg");
  closeBtnCard.addEventListener("click", deleteCard);
  readIcon.addEventListener("click", markAsRead);
  card.setAttribute("data", myLibrary.indexOf(book));

  // Append icons so they appear at the top
  closeBtnParent.appendChild(closeBtnCard);
  closeBtnParent.appendChild(readIcon);

  card.appendChild(closeBtnParent);
  card.appendChild(line.cloneNode(true));

  Object.entries(book).forEach(([key, value]) => {
    switch (key) {
      case "title": {
        bookInfo = document.createElement("h2");
        bookInfo.innerHTML = `${value}`;
        infoContainer.appendChild(bookInfo);
        break;
      }
      case "author": {
        bookInfo = document.createElement("h4");
        bookInfo.innerHTML = `By ${value}`;
        infoContainer.appendChild(bookInfo);
        break;
      }

      case "pages": {
        bookInfo = document.createElement("p");
        bookInfo.innerHTML = ` ${value} Pages`;
        infoContainer.appendChild(bookInfo);
        break;
      }

      default: {
        bookInfo = document.createElement("p");
        bookInfo.innerHTML = `${value}`;
        break;
      }
    }
  });
  card.appendChild(infoContainer);
  card.appendChild(line);
  card.appendChild(bookInfo);
  appendTo.appendChild(card);
}

function capitalizeWord(word) {
  const words = word.split(" ");
  const newWords = [];

  words.forEach((w) => {
    const rest = w.slice(1).toLowerCase();
    newWords.push(w.charAt(0).toUpperCase() + rest);
  });
  return newWords.join(" ");
}

function deleteCard(e) {
  const indexOfCard = e.target.parentNode.parentNode.getAttribute("data");
  myLibrary.splice(indexOfCard, 1);
  updateLibrary(myLibrary);
}

function markAsRead(e) {
  const indexOfCard = e.target.parentNode.parentNode.getAttribute("data");
  const parentCard = e.target.parentNode.parentNode;

  const book = myLibrary[indexOfCard];
  if (book.read == "Not Read") {
    e.target.setAttribute("src", "./icons/unread.svg");
    parentCard.classList.add("read");
    console.log(parentCard.classList);
  } else {
    e.target.setAttribute("src", "./icons/read.svg");
    parentCard.classList.add("notRead");
  }

  book.toggleRead();
  updateLibrary(myLibrary);
}

function updateLibrary(library) {
  const elements = document.querySelectorAll(".bookCard");
  elements.forEach((card) => {
    card.remove();
  });

  if (library.length == 0) {
    bookbtn.style.display = "flex";
  }

  library.forEach((book) => {
    createCard(book);
  });
}

submitButton.addEventListener("click", () => addBookToLibrary());
bookbtn.addEventListener("click", () => showAddMenu());
bookBtnHeader.addEventListener("click", () => showAddMenu());
closeBtn.addEventListener("click", () => showAddMenu());
form.addEventListener("submit", handleForm);

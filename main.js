let submitButton = document.getElementById("subBtn");
let form =  document.getElementById("myForm");
let appendTo = document.querySelector(".bookContainer");
submitButton.addEventListener("click", () => addBookToLibrary());
form.addEventListener('submit', handleForm);
console.log(appendTo);
let myLibrary = [];

function handleForm(event)
{
    event.preventDefault();
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() 
{
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#auth").value;
    let pages = document.querySelector("#pages").value;
    let read = document.getElementById("read").checked ? "Read" : "Not Read";

    let book = new Book([title],[author],[pages],[read]);
    myLibrary.push(book);
    let newBook =  document.createElement('div');

    for (const [key, value] of Object.entries(book))
    {
        let test;
        if(key == "title")
        {
            test = document.createElement('h2');
        }else
        {
            test = document.createElement('p');

        }
        test.textContent = value;
        newBook.appendChild(test);
    }


    newBook.classList.add("bookCard");
    appendTo.appendChild(newBook);   
}


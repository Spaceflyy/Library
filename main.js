let submitButton = document.getElementById("subBtn");
let form =  document.getElementById("myForm");
let appendTo = document.querySelector(".bookContainer");
let bookbtn = document.querySelector(".addBookBtn");
let addForm = document.querySelector(".addBookForm");
let closeBtn = document.querySelector("#closeBtn .icon");

submitButton.addEventListener("click", () => addBookToLibrary());
bookbtn.addEventListener("click", () => showAddMenu())
closeBtn.addEventListener("click", () =>showAddMenu());

// closeCardBtn.forEach(item =>{
//     item.addEventListener("click", deleteCard)
// })
form.addEventListener('submit', handleForm);


let myLibrary = [];


function handleForm(event)
{
    event.preventDefault();
}

function showAddMenu()
{
    if(addForm.style.display == "none" || addForm.style.display == "")
    {
        addForm.style.display = "block";
    } else
    {
        addForm.style.display = "none";
    }
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

    createCard(book);


 
}

function createCard(book)
{
    bookbtn.style.display = "none";
    let closeBtn = document.createElement("IMG");
    let newBook =  document.createElement('div');  
    let closeBtnParent = document.createElement("div")
    closeBtnParent.setAttribute("id", "closeBtnCard");
    closeBtn.classList.add("icon");
    closeBtn.setAttribute("src", "./icons/close.svg");
    closeBtnParent.appendChild(closeBtn);
    newBook.appendChild(closeBtnParent);

    for (const [key, value] of Object.entries(book))
    {
        let element;
        if(key == "title")
        {
            element = document.createElement('h2');
        }else
        {
            element = document.createElement('p');

        }
        element.textContent = value;
        newBook.appendChild(element);
    }


    newBook.classList.add("bookCard");
    newBook.setAttribute("data", myLibrary.indexOf(book));
    appendTo.appendChild(newBook);  

    closeBtn.addEventListener("click",deleteCard);



}

function deleteCard(e)
{
    let indexOfCard = e.target.parentNode.parentNode.getAttribute("data");
    myLibrary.splice(indexOfCard, 1);
    let elements = document.querySelectorAll(".bookCard");
    elements.forEach(card => {
        card.remove();
    });
    updateLibrary(myLibrary);
}

function updateLibrary(library)
{

    if(library.length == 0)
    {
        bookbtn.style.display = "flex";
    }


    console.log(library.length);
    library.forEach(book => {
        createCard(book);
    });
}
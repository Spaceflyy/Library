let submitButton = document.getElementById("subBtn");
let form =  document.getElementById("myForm");
let appendTo = document.querySelector(".bookContainer");
let bookbtn = document.querySelector(".addBookBtn");
let addForm = document.querySelector(".addBookForm");
let closeBtn = document.querySelector("#closeBtn .icon");
let bookBtnHeader = document.querySelector(".header button");


submitButton.addEventListener("click", () => addBookToLibrary());
bookbtn.addEventListener("click", () => showAddMenu());
bookBtnHeader.addEventListener("click", () => showAddMenu());
closeBtn.addEventListener("click", () =>showAddMenu());

form.addEventListener('submit', handleForm);


let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    console.log(this.read);

    if(this.read == "Not Read")
    {
        this.read = "Read";
    } else
    {
        this.read = "Not Read";
    }
}

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



function addBookToLibrary() 
{
    bookbtn.style.display = "none";

    let title = document.querySelector("#title").value;
    let author= document.querySelector("#auth").value;
    let pages = document.querySelector("#pages").value;

    let read = document.getElementById("read").checked ? "Read" : "Not Read";

    let book = new Book([title],[author],[pages],[read]);
    myLibrary.push(book);
    createCard(book);

}

function createCard(book)
{
    // Create card elements
    let card = document.createElement("div");
    let closeBtnParent = document.createElement("div");
    let closeBtnCard = document.createElement("IMG");
    let readIcon = document.createElement("IMG");

    // Add classes to card elements
    card.classList.add("bookCard");
    closeBtnCard.classList.add("icon");
    readIcon.classList.add("icon");

    // Set attributes for cards
    closeBtnParent.setAttribute("id", "closeBtn");
    if(book.read == "Not Read")
    {  
        readIcon.setAttribute("src", "./icons/read.svg");

    } else
    {
        readIcon.setAttribute("src", "./icons/unread.svg");

    }

    
    closeBtnCard.setAttribute("src", "./icons/close.svg");
    closeBtnCard.addEventListener("click", deleteCard);
    readIcon.addEventListener("click", markAsRead);
    card.setAttribute("data", myLibrary.indexOf(book));

    // Append icons so they appear at the top
    closeBtnParent.appendChild(readIcon);
    closeBtnParent.appendChild(closeBtnCard);
    card.appendChild(closeBtnParent);

    Object.entries(book).forEach(([key, value]) => {
        let bookInfo;
        if(key == "title")
        {
             bookInfo = document.createElement("h2");
        } else
        {
             bookInfo = document.createElement("p");
        }

        switch (key)
        {
            case "author":
                {
                    bookInfo.innerHTML =  `By ${value}`;
                    break;
                }

            case "pages":
                {
                    bookInfo.innerHTML =  ` ${value} Pages`;
                    break;
                }

            default:
                {
                    bookInfo.innerHTML =  `${value}`; 
                    break;
                }
        }

        card.appendChild(bookInfo);
    });
    
    appendTo.appendChild(card);
}

function deleteCard(e)
{
    let indexOfCard = e.target.parentNode.parentNode.getAttribute("data");
    myLibrary.splice(indexOfCard, 1);
    updateLibrary(myLibrary);
}

function markAsRead(e)
{
    let indexOfCard =  e.target.parentNode.parentNode.getAttribute("data");

    let book = myLibrary[indexOfCard];
    if(book.read == "Not Read")
    {  
        e.target.setAttribute("src", "./icons/unread.svg");
    } else
    {
        e.target.setAttribute("src", "./icons/read.svg");

    }

    book.toggleRead();
    updateLibrary(myLibrary);

}

function updateLibrary(library)
{

    let elements = document.querySelectorAll(".bookCard");
    elements.forEach(card => {
        card.remove();
    });

    if(library.length == 0)
    {
        bookbtn.style.display = "flex";
    } 
    

    library.forEach(book => {
         createCard(book);
     });
}
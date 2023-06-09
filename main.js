let submitButton = document.getElementById("subBtn");
let form =  document.getElementById("myForm");
let appendTo = document.querySelector(".bookContainer");
let bookbtn = document.querySelector(".addBookBtn");
let addForm = document.querySelector(".addBookForm");
let closeBtn = document.querySelector("#closeBtn .icon");
let bookBtnHeader = document.querySelector(".header button");
let formBackground = document.querySelector(".formBackground");


submitButton.addEventListener("click", () => addBookToLibrary());
bookbtn.addEventListener("click", () => showAddMenu());
bookBtnHeader.addEventListener("click", () => showAddMenu());
closeBtn.addEventListener("click", () =>showAddMenu());

form.addEventListener("submit", handleForm);


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
    form.reset();
    if(addForm.style.display == "none" || addForm.style.display == "")
    {
        addForm.style.display = "block";
        formBackground.style.display = "block";
    } else
    {
        addForm.style.display = "none";
        formBackground.style.display = "none";
    }
}



function addBookToLibrary() 
{


    let title = capitalizeWord(document.querySelector("#title").value);
    let author= capitalizeWord(document.querySelector("#auth").value);
    let pages = document.querySelector("#pages").value;
    let read = document.getElementById("read").checked ? "Read" : "Not Read";

    if (title == "" || author == "" || pages == "")
    {

    } else
    {
        bookbtn.style.display = "none";
        let book = new Book([title],[author],[pages],[read]);
        myLibrary.push(book);
        createCard(book);
    }
}

function createCard(book)
{
    // Create card elements
    let card = document.createElement("div");
    let closeBtnParent = document.createElement("div");
    let closeBtnCard = document.createElement("IMG");
    let readIcon = document.createElement("IMG");
    let infoContainer = document.createElement("div");
    let line = document.createElement("div");

    let bookInfo;
    // Add classes to card elements
    infoContainer.classList.add("cardInfoContainer");
    line.classList.add("line");
    card.classList.add("bookCard");
    closeBtnCard.classList.add("icon");
    readIcon.classList.add("icon");

    // Set attributes for cards
    closeBtnParent.setAttribute("id", "closeBtn");
    if(book.read == "Not Read")
    {  
        readIcon.setAttribute("src", "./icons/read.svg");
        card.classList.add("notRead");

    } else
    {
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

        switch (key)
        {
            case "title" : 
            {
                bookInfo = document.createElement("h2");
                bookInfo.innerHTML =  `${value}`; 
                infoContainer.appendChild(bookInfo);
                break;
            }
            case "author":
                {
                    bookInfo = document.createElement("h4")
                    bookInfo.innerHTML =  `By ${value}`;
                    infoContainer.appendChild(bookInfo);
                    break;
                }

            case "pages":
                {
                    bookInfo = document.createElement("p");
                    bookInfo.innerHTML =  ` ${value} Pages`;
                    infoContainer.appendChild(bookInfo);
                    break;
                }

            default:
                {
                    bookInfo = document.createElement("p");
                    bookInfo.innerHTML =  `${value}`; 
                    break;
                }
        }


    });
    card.appendChild(infoContainer);
    card.appendChild(line);
    card.appendChild(bookInfo);
    appendTo.appendChild(card);
}

function capitalizeWord(word)
{
    let words = word.split(" ");
    let newWords=[];
    
    words.forEach(w =>{
        let rest = w.slice(1).toLowerCase();
        newWords.push(w.charAt(0).toUpperCase() + rest);
    });
return newWords.join(" ");
    
}


function deleteCard(e)
{
    let indexOfCard = e.target.parentNode.parentNode.getAttribute("data");
    myLibrary.splice(indexOfCard, 1);
    updateLibrary(myLibrary);
}

function markAsRead(e)
{
    let indexOfCard =  e.target.parentNode.parentNode.getAttribute("data")
    let parentCard =e.target.parentNode.parentNode;

    let book = myLibrary[indexOfCard];
    if(book.read == "Not Read")
    {  
        e.target.setAttribute("src", "./icons/unread.svg");
        parentCard.classList.add("read");
        console.log(parentCard.classList);
    } else
    {
        e.target.setAttribute("src", "./icons/read.svg");
        parentCard.classList.add("notRead");
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
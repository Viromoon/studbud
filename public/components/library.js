let myLibrary = storeBooks()

// function constructor for the book
function Book(title, author, isbn, read = true) {
    this.title = title
    this.author = author
    this.isbn = isbn
    this.read = read ? "✔" : "❌"
}

// add book to library from user's input
const addBookToLibrary = () =>{
    let title = document.querySelector('[data-name=title]').value;
    let author = document.querySelector('[data-name=author]').value;
    let isbn = document.querySelector('[data-name=isbn]').value;
    let read = document.querySelector('[data-name=read]').checked;

    myLibrary.push(new Book(title, author, isbn, read))
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

// clear field after submitting a new book
function clearFields() {
    document.querySelector('[data-name=title]').value = "";
    document.querySelector('[data-name=author]').value = "";
    document.querySelector('[data-name=isbn]').value = "";
    document.querySelector('[data-name=read]').checked;
}

// add the book details to the DOM
const render = () =>{
    const list = document.querySelector('.bookList');
    let row;
    for (var book of myLibrary) {
        row = document.createElement('tr')
        row.innerHTML =
            `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td class="read-status">${book.read}</td>
        <td><button class="delete">Delete</button></td>
        `
        list.appendChild(row)
    }
}

// event listener to display book details on add button
document.querySelector('form').addEventListener('submit', (e) => {
    const title = document.querySelector('[data-name=title]').value;
    const author = document.querySelector('[data-name=author]').value;
    const isbn = document.querySelector('[data-name=isbn]').value;

    if (title == "" || author == "" || isbn == "") {
        alert('Fill in the empty spaces')
    } else {
        document.querySelector('.bookList').innerHTML = ''
        addBookToLibrary();
        render();
        clearFields();
        document.querySelector("[data-name=title]").focus();
    }
    e.preventDefault();
});

// remove a book
document.querySelector('.bookList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        removebook(e.target.parentElement.parentElement.children[0].textContent)
    }
})

//load existing books from storage upon opening the isbn
document.addEventListener('DOMContentLoaded', render);

// show add book form
    document.querySelector('.add').addEventListener('click', (e) => {
        let form = document.querySelector('form');
        form.style.display = 'block'
        document.querySelector('.add').style.display = 'none';
        document.querySelector('[data-name=title]').focus()
    })

// close add book form
    document.querySelector('.fa-times').addEventListener("click", () => {
        let form = document.querySelector('form');
        form.style.display = 'none'
        document.querySelector('.add').style.display = 'block';
    })

// change status of read
    document.querySelector('.bookList').addEventListener('click', (e) => {
        if (e.target.className == "read-status"){ 
            if(e.target.textContent == '✔') {
                e.target.textContent = "❌"
                changeReadStatus(e.target.textContent, e.target.parentElement.children[0].textContent)
            } else {
                e.target.textContent = "✔"
                changeReadStatus(e.target.textContent, e.target.parentElement.children[0].textContent)
            }
        }
        
        })

function storeBooks(){
    let books;
    if (localStorage.getItem('library') === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('library'))
    }
    return books
}

// remove book
const removebook = (title) => {
    const library = JSON.parse(localStorage.getItem('library'))
    library.forEach((book, index) => {
        if (book.title == title) library.splice(index, 1)
    })
    localStorage.setItem('library', JSON.stringify(library))
}

// change read status
const changeReadStatus = (read, title) => {
    const library = JSON.parse(localStorage.getItem('library'))
    library.forEach(book=>{
        if(book.title === title) book.read = read
    })
    localStorage.setItem('library', JSON.stringify(library))
}

const myLibrary = [];

function Book(title, author, page, publicationYear) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.read = false
    this.title = title;
    this.author = author;
    this.page = page;
    this.publicationYear = publicationYear;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, page, publicationYear) {
    const book = new Book(title, author, page, publicationYear);
    myLibrary.push(book)
    renderLibrary()
}

function renderLibrary() {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = ""

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        const readBtn = document.createElement("button");
        readBtn.classList.add("btn", "readBtn")
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "deleteBtn")
        const bookİnfo = document.createElement("p")

        readBtn.textContent = book.read ? "Marked as Read" : "Marked as Unread";
        deleteBtn.textContent = "Delete"

        deleteBtn.addEventListener("click", () => {
            const id = card.getAttribute("data-id")
            const index = myLibrary.findIndex(book => book.id === id);
            if (index !== -1) {
                myLibrary.splice(index, 1)
                renderLibrary()
            }
        });
        readBtn.addEventListener("click", () => {
            book.toggleRead();
            readBtn.textContent = book.read ? "Marked as Read" : "Marked as Unread";
        })

        card.classList.add("card")
        card.setAttribute("data-id", book.id)
        bookİnfo.innerHTML = `
            Title : ${book.title}<br>
            Author : ${book.author}<br>
            Pages : ${book.page}<br>
            Publication of Year : ${book.publicationYear}`;
        card.append(bookİnfo, readBtn, deleteBtn)
        bookContainer.appendChild(card);
    })
}

const dialog = document.getElementById("bookDialog");
const form = document.getElementById("bookForm");
const addBookBtn = document.getElementById("addBookBtn");
const cancelBtn = document.getElementById("cancelBtn");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const page = parseInt(document.getElementById("bookYear").value);
    const publicationYear = parseInt(document.getElementById("bookYear").value);

    if (title && author && page > 0 && publicationYear > 0) {
        addBookToLibrary(title, author, page, publicationYear);
        dialog.close();
        form.reset();
      } else {
        alert("Please enter correct values ​​in all fields.");
      }
});

// examples
addBookToLibrary("Budala", "Dostoyevski", 784, 1869)

addBookToLibrary("Oblomov", "Gonçarov", 632, 1859)
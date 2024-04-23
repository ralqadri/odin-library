const myLibrary = [];

class Book {
	constructor(
		name = "Unknown",
		author = "Unknown Author",
		pages = 0,
		read = false
	) {
		this.name = name;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

const cardContainer = document.querySelector(".cards");

// BOOK RELATED FUNCTION(S)

function searchBook(search) {
	return myLibrary.find(({ name }) => name === search);
}

function searchIndexBook(search) {
	return myLibrary.findIndex(({ name }) => name === search);
}

function addBookToLibrary(name, author, pages, read) {
	const newBook = new Book(name, author, pages, read);
	myLibrary.push(newBook);
	addBookToPage(newBook);
}

function addBookToPage(book) {
	const card = document.createElement("div");
	const cardTitle = document.createElement("div");
	const cardAuthor = document.createElement("div");
	const cardPages = document.createElement("div");
	const cardButtons = document.createElement("div");
	const cardRead = document.createElement("button");
	const cardDelete = document.createElement("button");

	card.classList.add("card");
	cardTitle.classList.add("card-title");
	cardAuthor.classList.add("card-author");
	cardPages.classList.add("card-pages");
	cardButtons.classList.add("card-buttons");
	cardRead.classList.add("card-read");
	cardDelete.classList.add("card-delete");

	cardTitle.textContent = book.name;
	cardAuthor.textContent = book.author;
	cardPages.textContent = book.pages;
	if (book.read) {
		cardRead.textContent = "Read";
		cardRead.classList.add("btn-read-marker");
		card.classList.add("card-read-marker");
	} else {
		cardRead.textContent = "Not read";
		cardRead.classList.add("btn-unread-marker");
		card.classList.add("card-unread-marker");
	}
	cardRead.onclick = toggleReadStatus;
	cardDelete.textContent = "Delete";
	cardDelete.onclick = removeBookCard;

	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	cardButtons.appendChild(cardRead);
	cardButtons.appendChild(cardDelete);
	card.appendChild(cardButtons);

	cardContainer.appendChild(card);
}

function resetCardContainer(cardContainer) {
	cardContainer.innerHTML = "";
}

function updateCardContainer(cardContainer) {
	resetCardContainer(cardContainer);
	myLibrary.forEach(function (book) {
		addBookToPage(book);
	});
}

// A part of this code is inspired by Michal Osman
function removeBookCard(e) {
	const targetedCard = e.target.parentNode.parentNode.firstChild.innerHTML;

	const index = searchIndexBook(targetedCard);
	if (index !== -1) {
		myLibrary.splice(index, 1);
		updateCardContainer(cardContainer);
	}
}

function toggleReadStatus(e) {
	const targetedCard = e.target.parentNode.parentNode.firstChild.innerHTML;

	const index = searchIndexBook(targetedCard);
	if (index !== -1) {
		myLibrary[index].read = !myLibrary[index].read;
	}

	updateCardContainer(cardContainer);
}

// DIALOG & MODALS (ADD BOOK POP-UP)

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show-button");
const closeButton = document.querySelector(".close-button");

const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => {
	dialog.showModal();
});

closeButton.addEventListener("click", () => {
	resetInputValues();
	dialog.close();
});

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", submitClick, false);

function submitClick(event) {
	const titleInput = document.querySelector("#book-title").value;
	const authorInput = document.querySelector("#book-author").value;
	const pagesInput = document.querySelector("#book-pages").value;
	const readInput = document.querySelector("#book-read");
	const readStatus = readInput.checked ? true : false;

	addBookToLibrary(titleInput, authorInput, pagesInput, readStatus);

	resetInputValues();
	event.preventDefault();
	dialog.close();
}

function resetInputValues() {
	document.querySelector("#book-title").value = "";
	document.querySelector("#book-author").value = "";
	document.querySelector("#book-pages").value = "";
}

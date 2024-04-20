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

// TODO: Clean up this function later?
function printAllBooks() {
	myLibrary.forEach(function (book) {
		console.log(book);
	});
}

function searchBook(search) {
	return myLibrary.find(({ name }) => name === search);
}

function searchIndexBook(search) {
	return myLibrary.findIndex(({ name }) => name === search);
}

function addBookToLibrary(name, author, pages) {
	const newBook = new Book(name, author, pages);
	myLibrary.push(newBook);
	addBookToPage(newBook);
}

function addBookToPage(book) {
	const card = document.createElement("div");
	const cardTitle = document.createElement("div");
	const cardAuthor = document.createElement("div");
	const cardPages = document.createElement("div");
	const cardDelete = document.createElement("button");
	const cardRead = document.createElement("button");

	card.classList.add("card");
	cardTitle.classList.add("card-title");
	cardAuthor.classList.add("card-author");
	cardPages.classList.add("card-pages");
	cardDelete.classList.add("card-delete");
	cardRead.classList.add("card-read");

	cardTitle.textContent = book.name;
	cardAuthor.textContent = book.author;
	cardPages.textContent = book.pages;
	cardDelete.textContent = "Delete";
	cardDelete.onclick = removeBookCard;
	// TODO: Make toggleBookRead function later
	if (book.read) {
		cardRead.textContent = "Read";
	} else {
		cardRead.textContent = "Not read";
	}
	// cardRead.onclick = toggleBookRead;

	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	card.appendChild(cardDelete);
	card.appendChild(cardRead);

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

function removeBook(search) {
	const index = searchIndexBook(search);
	if (index !== -1) {
		myLibrary.splice(index, 1);
		updateCardContainer(cardContainer);
	} else {
		console.log(`Not found: ${search}`);
	}
}

// A part of this code is inspired by Michal Osman
function removeBookCard(e) {
	const targetedCard = e.target.parentNode.firstChild.innerHTML;
	removeBook(targetedCard);
}

// TODO: Add read toggle button for each card

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

	console.log(titleInput, authorInput, pagesInput, readStatus);

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

// DUMMY DATA (ADDING FILLER BOOKS TO LIBRARY)

addBookToLibrary("Normal People", "Sally Rooney", 293, false);
addBookToLibrary("Play It As It Lays", "Joan Didion", 192, false);
addBookToLibrary("A Single Man", "Christopher Isherwood", 86, false);
addBookToLibrary("Conversations on Love", "Natasha Lunn", 321, false);
addBookToLibrary("Hall Of Small Mammals", "Thomas Pierce", 461, false);
addBookToLibrary("A Little Life", "Hanya Yanagihara", 802, false);

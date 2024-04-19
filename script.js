const myLibrary = [];

const cardContainer = document.querySelector(".cards");
// console.log(cardContainer);

function Book(name, author, pages) {
	this.name = name ? name : "Unknown";
	this.author = author ? author : "Unknown Author";
	this.pages = pages ? pages : 0;
}

function addBookToLibrary(name, author, pages) {
	const newBook = new Book(name, author, pages);
	myLibrary.push(newBook);
	addBookToPage(newBook);
}

function printAllBooks() {
	myLibrary.forEach(function (book) {
		console.log(book);
	});
}

function showAllBooks() {
	myLibrary.forEach(function (book) {
		addBookToPage(book);
	});
}

function addBookToPage(book) {
	const card = document.createElement("div");
	const cardTitle = document.createElement("div");
	const cardAuthor = document.createElement("div");
	const cardPages = document.createElement("div");

	card.classList.add("card");
	cardTitle.classList.add("card-title");
	cardAuthor.classList.add("card-author");
	cardPages.classList.add("card-pages");

	cardTitle.textContent = book.name;
	cardAuthor.textContent = book.author;
	cardPages.textContent = book.pages;

	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);

	cardContainer.appendChild(card);
}

addBookToLibrary("Normal People", "Sally Rooney", 293);
addBookToLibrary("Play It As It Lays", "Joan Didion", 192);
addBookToLibrary("A Single Man", "Christopher Isherwood", 86);
addBookToLibrary("Conversations on Love", "Natasha Lunn", 321);
addBookToLibrary("Hall Of Small Mammals", "Thomas Pierce", 461);
addBookToLibrary("A Little Life", "Hanya Yanagihara", 802);

// showAllBooks();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show-button");
const closeButton = document.querySelector(".close-button");

const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => {
	dialog.showModal();
});

closeButton.addEventListener("click", () => {
	dialog.close();
});

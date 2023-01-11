class Books {
  constructor(array) {
    this.bookArray = array;
  }

  bookObj(bookTitle, authorName) {
    const eachBook = {
      title: bookTitle,
      author: authorName,
    };
    this.bookArray.push(eachBook);
  }

  booksFilter(eachBook) {
    this.bookArray = this.bookArray.filter((book) => book !== eachBook);
  }
}

const allBooks = new Books([]);

function addToLocalStorage() {
  const stringifyArray = JSON.stringify(allBooks.bookArray);
  localStorage.setItem("storedBooks", stringifyArray);
}

function displayBook() {
  const addedBooks = document.getElementById("list");
  addedBooks.innerHTML = "";
  for (let i = 0; i < allBooks.bookArray.length; i += 1) {
    const container = document.createElement("div");
    container.classList.add("book");
    addedBooks.appendChild(container);

    const container02 = document.createElement("div");
    container02.classList.add("titleAuthor");
    container.appendChild(container02);

    const bookDetails = document.createElement("p");
    bookDetails.classList.add("title");
    bookDetails.textContent = `"${allBooks.bookArray[i].title}" by ${allBooks.bookArray[i].author}`;
    container02.appendChild(bookDetails);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "Remove";

    removeButton.onclick = () => {
      allBooks.booksFilter(allBooks.bookArray[i]);
      addToLocalStorage();
      displayBook();
    };
    container02.appendChild(removeButton);
  }
}

function getFromLocalStorage() {
  const stringifyArray = localStorage.getItem("storedBooks");
  allBooks.bookArray = JSON.parse(stringifyArray);
  displayBook();
}

if (localStorage.getItem("storedBooks") == null) {
  addToLocalStorage();
} else {
  getFromLocalStorage();
}

const addBtn = document.getElementById("addButton");
addBtn.addEventListener("click", () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  allBooks.bookObj(title.value, author.value);
  addToLocalStorage();
  displayBook();
});

// eslint-disable-next-line no-unused-vars
function displaySection(section) {
  const sectionList = document.getElementById("list");
  const sectionForm = document.getElementById("form");
  const sectionContact = document.getElementById("contact");
  const heading = document.getElementById("bookTitle");

  switch (section) {
    case "list":
      sectionList.style.display = "block";
      sectionForm.style.display = "none";
      sectionContact.style.display = "none";
      heading.innerHTML = "All Awesome Books";
      break;

    case "form":
      sectionList.style.display = "none";
      sectionForm.style.display = "block";
      sectionContact.style.display = "none";
      heading.innerHTML = "Add a New Book";
      break;

    case "contact":
      sectionList.style.display = "none";
      sectionForm.style.display = "none";
      sectionContact.style.display = "block";
      heading.innerHTML = "Contact Information";
      break;

    default:
      break;
  }
}

function setDate() {
  const date = document.getElementById("date");
  // eslint-disable-next-line no-undef
  const { DateTime } = luxon;

  date.innerHTML = DateTime.now().toFormat("LLL dd yyyy, t");
}

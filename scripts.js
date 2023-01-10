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
  localStorage.setItem('storedBooks', stringifyArray);
}

function displayBook() {
  const addedBooks = document.getElementById('list');
  addedBooks.innerHTML = '';
  for (let i = 0; i < allBooks.bookArray.length; i += 1) {
    const container = document.createElement('div');
    container.classList.add('book');
    addedBooks.appendChild(container);

    const container02 = document.createElement('div');
    container02.classList.add('titleAuthor');
    container.appendChild(container02);

    const bookDetails = document.createElement('p');
    bookDetails.classList.add('title');
    bookDetails.textContent = `"${allBooks.bookArray[i].title}" by ${allBooks.bookArray[i].author}`;
    container02.appendChild(bookDetails);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';

    removeButton.onclick = () => {
      allBooks.booksFilter(allBooks.bookArray[i]);
      addToLocalStorage();
      displayBook();
    };
    container02.appendChild(removeButton);
    const hline = document.createElement('hr');
    container02.appendChild(hline);
  }
}

function getFromLocalStorage() {
  const stringifyArray = localStorage.getItem('storedBooks');
  allBooks.bookArray = JSON.parse(stringifyArray);
  displayBook();
}

if (localStorage.getItem('storedBooks') == null) {
  addToLocalStorage();
} else {
  getFromLocalStorage();
}

const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  allBooks.bookObj(title.value, author.value);
  addToLocalStorage();
  displayBook();
});

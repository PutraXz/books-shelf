let books = [];

document.getElementById("submitBook").addEventListener("click", function (event) {
  event.preventDefault();
  addBook();
  document.getElementById("add-modal").style.display = "none";
});

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isFinished = document.getElementById("check").checked;
  const book = {
    id: Date.now(),
    title,
    author,
    year,
    isFinished,
  };
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  window.location.href='';
}


function showBooks() {
  const notFinish = document.getElementById("notFinish");
  const finishBook = document.getElementById("finishBook");
  notFinish.innerHTML = "";
  finishBook.innerHTML = "";
  books.forEach(function (book, index) {
    const bookItem = `
      <div class="left-book">
        <h4 style="margin: 0.5rem 1rem;">${book.title}</h4>
        <p style="margin: 0.5rem 1rem;">${book.author}</p>
        <p style="margin: 0 1rem;">${book.year}</p>
      </div>
      <div class="right-book">
      ${
        !book.isFinished
          ? `<button class="finish" data-index="${index}">selesai</button>`
          : ""
      }
      <div class="delete-button">
        <button class="delete" data-index="${index}">hapus</button>
        </div>
      </div>
    `;
    if (book.isFinished) {
      finishBook.innerHTML += `<div class="book">${bookItem}</div>`;
    } else {
      notFinish.innerHTML += `<div class="book">${bookItem}</div>`;
    }
  });
  // fungsi button hapus
  const deleteButtons = document.querySelectorAll('.delete'); // dapatkan semua tombol "hapus"
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const index = e.target.dataset.index; // dapatkan index dari data-index
      books.splice(index, 1); // hapus elemen dengan index yang didapat dari array books
      localStorage.setItem('books', JSON.stringify(books)); // update data di localStorage
      showBooks(); // tampilkan kembali data buku
    });
  });
  // fungsi button selesai
  const finishButtons = document.querySelectorAll(".finish");
  finishButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const index = event.target.getAttribute("data-index");
      books[index].isFinished = true;
      localStorage.setItem("books", JSON.stringify(books));
      showBooks();
    });
  });
}

window.addEventListener("load", function () {
  books = JSON.parse(localStorage.getItem("books")) || [];
  showBooks();
});



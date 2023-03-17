function saveBook() {
  // ambil nilai inputan
  const id = new Date().getTime(); // generate id unik menggunakan timestamp
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const finished = document.getElementById("check").checked;
  
  // masukkan data ke dalam objek
  const book = { id, title, author, year, finished };
  
  // simpan data ke dalam localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

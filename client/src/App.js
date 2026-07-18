import "./App.css";
import API from "./services/api";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    quantity: "",
  });
const [books, setBooks] = useState([]);
const [editingId, setEditingId] = useState(null);
const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("user"));
});const handleChange = (e) => {
  setBook({
    ...book,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingId) {

      await API.put(`/${editingId}`, book);

      alert("Book Updated Successfully!");

      setEditingId(null);

    } else {

      await API.post("/", book);

      alert("Book Added Successfully!");

    }

    await fetchBooks();

    setBook({
      title: "",
      author: "",
      price: "",
      category: "",
      quantity: "",
    });
    setEditingId(null);
    
  } catch (error) {
    console.log(error);
    alert("Operation Failed");
  }
};

const handleDelete = async (id) => {
  try {
    await API.delete(`/${id}`);

    alert("Book Deleted Successfully!");

    fetchBooks();
  } catch (error) {
    console.log(error);
    alert("Failed to Delete Book");
  }
};

const handleEdit = (selectedBook) => {
  setBook({
    title: selectedBook.title,
    author: selectedBook.author,
    price: selectedBook.price,
    category: selectedBook.category,
    quantity: selectedBook.quantity,
  });

  setEditingId(selectedBook._id);
};

const fetchBooks = async () => {
  try {
    const response = await API.get("/");
    setBooks(response.data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  fetchBooks();
}, []);

if (!user) {
  return <Login onLogin={setUser} />;
}

  return (
    <Dashboard
    user={user}
    setUser={setUser}
    book={book}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    editingId={editingId}
    books={books}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
    );
}

export default App;
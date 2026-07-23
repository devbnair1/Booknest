import "./App.css";
import API from "./services/api";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterAdmin from "./components/RegisterAdmin";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
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
  });

  const [page, setPage] = useState("home");

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
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

      fetchBooks();

      setBook({
        title: "",
        author: "",
        price: "",
        category: "",
        quantity: "",
      });

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

  // Authentication Pages
  if (!user) {

    if (page === "home") {
      return <Home setPage={setPage} />;
    }

    if (page === "login") {
      return (
        <Login
          onLogin={setUser}
          setPage={setPage}
        />
      );
    }

    if (page === "register-user") {
      return <Register setPage={setPage} />;
    }

    if (page === "register-admin") {
      return <RegisterAdmin setPage={setPage} />;
    }

    return <Home setPage={setPage} />;
  }

  // Dashboard
  if (user.role === "admin") {
  return (
    <AdminDashboard
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

return (
  <UserDashboard
  user={user}
  setUser={setUser}
  books={books}
  fetchBooks={fetchBooks}
/>
);
}

export default App;
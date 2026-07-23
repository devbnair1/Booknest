import { useState } from "react";
import axios from "axios";

function AdminDashboard({
  user,
  setUser,
  book,
  handleChange,
  handleSubmit,
  editingId,
  books,
  handleEdit,
  handleDelete,
}) {

  const [showPurchases, setShowPurchases] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const fetchPurchases = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/purchases/all"
      );

      setPurchases(response.data);
      setShowPurchases(true);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Purchases");

    }
  };

  return (
    <div className="container">

      <h1>👨‍💼 Admin Dashboard</h1>

      <p>Welcome, {user.username}</p>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <button onClick={() => setShowPurchases(false)}>
        📚 Manage Books
      </button>

      <button onClick={fetchPurchases}>
        🛒 View Purchases
      </button>

      <hr />

      {showPurchases ? (

        <>
          <h2>All Purchases</h2>

          {purchases.length === 0 ? (

            <p>No Purchases Found.</p>

          ) : (

            purchases.map((item) => (

              <div key={item._id} className="book-card">

                <h3>{item.title}</h3>

                <p>
                  <strong>User:</strong> {item.username}
                </p>

                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>

                <p>
                  <strong>Purchased On:</strong>{" "}
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </p>

              </div>

            ))

          )}

        </>

      ) : (

        <>

          <h2>
            {editingId ? "Update Book" : "Add Book"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={book.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="author"
              placeholder="Author"
              value={book.author}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={book.price}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={book.category}
              onChange={handleChange}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={book.quantity}
              onChange={handleChange}
            />

            <button type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>

          </form>

          <hr />

          <h2>Books</h2>

          {books.length === 0 ? (

            <p>No books available.</p>

          ) : (

            books.map((item) => (

              <div key={item._id} className="book-card">

                <h3>{item.title}</h3>

                <p>
                  <strong>Author:</strong> {item.author}
                </p>

                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>

                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>

              </div>

            ))

          )}

        </>

      )}

    </div>
  );
}

export default AdminDashboard;
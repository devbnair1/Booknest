import { useState } from "react";
import axios from "axios";

function UserDashboard({
  user,
  setUser,
  books,
  fetchBooks,
}) {

  const [showPurchases, setShowPurchases] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleBuy = async (bookId) => {
    try {

      const response = await axios.post(
        "http://localhost:5000/api/purchases/buy",
        {
          username: user.username,
          bookId,
        }
      );

      alert(response.data.message);

      fetchBooks();

    } catch (error) {

      alert(
        error.response?.data?.message || "Purchase Failed"
      );

    }
  };

  const fetchPurchases = async () => {
    try {

      const response = await axios.get(
        `http://localhost:5000/api/purchases/${user.username}`
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

      <h1>👤 User Dashboard</h1>

      <p>Welcome, {user.username}</p>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <button onClick={fetchPurchases}>
        My Purchases
      </button>

      <button onClick={() => setShowPurchases(false)}>
        Available Books
      </button>

      <hr />

      {showPurchases ? (

        <>
          <h2>My Purchases</h2>

          {purchases.length === 0 ? (

            <p>No Purchases Yet.</p>

          ) : (

            purchases.map((item) => (

              <div
                key={item._id}
                className="book-card"
              >

                <h3>{item.title}</h3>

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

          <h2>Available Books</h2>

          {books.length === 0 ? (

            <p>No books available.</p>

          ) : (

            books.map((item) => (

              <div
                key={item._id}
                className="book-card"
              >

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

                <button
                  onClick={() => handleBuy(item._id)}
                  disabled={item.quantity === 0}
                >
                  {item.quantity === 0
                    ? "Out of Stock"
                    : "Buy Now"}
                </button>

              </div>

            ))

          )}

        </>

      )}

    </div>
  );
}

export default UserDashboard;
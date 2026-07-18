function Dashboard({
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
  return (
    <div className="container">

      <h1>📚 BookNest</h1>

      <div className="header">

  <div>
    <h2>Welcome, {user.username} 👋</h2>
    <p>Role: {user.role}</p>
  </div>

  <button
    onClick={() => {
      localStorage.removeItem("user");
      setUser(null);
    }}
  >
    Logout
  </button>

</div>

      <hr />

      {user.role === "admin" && (
        <>
          <h2>Add Book</h2>

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
        </>
      )}

      <h2>Available Books</h2>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((item) => (
          <div key={item._id} className="book-card">

            <h3>{item.title}</h3>

            <p><strong>Author:</strong> {item.author}</p>

            <p><strong>Price:</strong> ₹{item.price}</p>

            <p><strong>Category:</strong> {item.category}</p>

            <p><strong>Quantity:</strong> {item.quantity}</p>

            {user.role === "admin" && (
              <>
                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </>
            )}

            <hr />

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;
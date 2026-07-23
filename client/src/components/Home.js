function Home({ setPage }) {
  return (
    <div className="container">

      <h1>📚 BookNest</h1>

      <p className="subtitle">
        Book Store Management System
      </p>

      <button onClick={() => setPage("login")}>
        Login
      </button>

      <br /><br />

      <button onClick={() => setPage("register-user")}>
        Register as User
      </button>

      <br /><br />

      <button onClick={() => setPage("register-admin")}>
        Register as Admin
      </button>

    </div>
  );
}

export default Home;
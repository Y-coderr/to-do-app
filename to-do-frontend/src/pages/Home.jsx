import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="container">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Todo App</h1>
        <p>A simple application to manage your tasks efficiently</p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/register" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home


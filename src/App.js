import './App.css';
import {BrowserRouter  as Router,Routes,Route,Navigate} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProductList from "./pages/ProductList"
function App() {
  const isLoggedIn = !!localStorage.getItem('email');
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route
            path="/"
            element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />}
          />
        </Routes>
    </div>
    </Router>
  );
}

export default App;

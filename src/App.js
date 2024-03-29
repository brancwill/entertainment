import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Guest from "./Guest";
import { useAuthContext } from "./hooks/useAuthContext";
import './styles/styles.css'
import Sorry from "./Sorry";

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/sorry" element={user ? <Sorry /> : <Navigate to="/login" />} />
        <Route path="/guest" element={<Guest />} />
      </Routes>
      )}
    </div>
  );
}

export default App;

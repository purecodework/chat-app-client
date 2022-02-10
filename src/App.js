import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/chat" exact element={<ChatPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;

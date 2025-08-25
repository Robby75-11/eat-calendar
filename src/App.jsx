import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RecipesPage from "./components/RecipesPage";
import MealPlansPage from "./components/MealPlansPage";
import MyNavbar from "./components/MyNavbar";
import LoginForm from "./components/LoginForm";
import CalendarPage from "./components/CalendarPAge";
import RegisterForm from "./components/RegisterForm";
import "./styles/Custom.css";

function App() {
  return (
    <Router>
      <MyNavbar />
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/recipes" style={{ marginRight: "10px" }}>
          🍝 Ricette
        </Link>
        <Link to="/login">🔑 Login</Link>
        <Link to="/mealplans">📅 Meal Plans</Link>
        <Link to="/calendar"> 🗓️Calendario</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Benvenuto in EatCalendar 🍽️</h1>} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/mealplans" element={<MealPlansPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;

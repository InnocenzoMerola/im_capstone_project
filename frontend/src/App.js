import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Categories />
      <Routes>
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

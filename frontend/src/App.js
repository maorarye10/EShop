import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./views/HomePage";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

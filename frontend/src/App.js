import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/HomePage/HomePage";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./views/HomePage";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <NavLink href="/">eshop</NavLink>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

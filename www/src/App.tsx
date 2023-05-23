import { Routes, Route } from "react-router-dom";
import { Home, Artist, NoMatch } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;

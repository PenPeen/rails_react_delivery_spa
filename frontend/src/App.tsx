import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Foods, Orders, Restaurants } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/restaurants/:restaurantsId/foods' element={<Foods />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

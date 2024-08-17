import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Foods, Orders, Restaurants } from "./components";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='head__contents'>
          <Header title='PenEats' logoUrl='/logo.jpg' isFixed />
        </div>
        <div className='main__contents'>
          <Routes>
            <Route path='/' element={<Restaurants />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route
              path='/restaurants/:restaurantsId/foods'
              element={<Foods />}
            />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

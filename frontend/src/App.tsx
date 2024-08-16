import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Foods, Orders, Restaurants } from "./components";
import { createContext, Dispatch, SetStateAction } from "react";
import { Food } from "./type/food";
import { Header } from "./components/Header/Header";

type ParentContextType = [Food, Dispatch<SetStateAction<Food | null>>];
export const ParentContext = createContext<ParentContextType>({} as never);

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

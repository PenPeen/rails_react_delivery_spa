import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Foods, Orders, Restaurants } from "./components";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Food } from "./type/food";

type ParentContextType = [Food, Dispatch<SetStateAction<Food | null>>];
export const ParentContext = createContext<ParentContextType>({} as never);

function App() {
  const [selectedFood, setSelectedFood] = useState<Food>({} as never);

  return (
    <>
      <BrowserRouter>
        <ParentContext.Provider
          value={[
            selectedFood,
            setSelectedFood as Dispatch<SetStateAction<Food | null>>,
          ]}
        >
          <Routes>
            <Route path='/restaurants' element={<Restaurants />} />
            <Route
              path='/restaurants/:restaurantsId/foods'
              element={<Foods />}
            />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </ParentContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

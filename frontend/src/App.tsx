import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Foods, Orders, Restaurants } from './components';
import { Header } from '@/components/Header/Header';
import { createContext, useReducer } from 'react';
import CartSlice, { initialState } from './stores/cart_reducer';
import NotFound from '@/components/NotFound/NotFound';

type CartContextType = [number, (count: number) => void];
export const CartContext = createContext<CartContextType>({} as never);
const { actions, reducer } = CartSlice;
const { setCount } = actions;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleCount = (count: number) => dispatch(setCount(count));

  return (
    <>
      <CartContext.Provider value={[state.count, handleCount]}>
        <BrowserRouter>
          <div className="head__contents">
            <Header title="PenEats" logoUrl="/logo.jpg" isFixed />
          </div>
          <div className="main__contents">
            <Routes>
              <Route path="/" element={<Restaurants />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:restaurantsId/foods" element={<Foods />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartContext.Provider>
    </>
  );
}

export default App;

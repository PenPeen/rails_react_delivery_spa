import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Foods, Orders, Restaurants } from './components';
import { Header } from '@/components/Header/Header';
import { createContext, useEffect, useReducer, useState } from 'react';
import CartSlice, { initialState } from './stores/cart_reducer';
import NotFound from '@/components/NotFound/NotFound';
import { User } from './type';
import { getCurrentUser } from './utils/auth';
import { useRequestStatus } from './hooks/use_request_status';
import { REQUEST_STATE } from './config/constants';
import { RequestStatusState } from './stores/request_status_reducer';

type RequestContext = {
  requestState: RequestStatusState;
  loading: () => void;
  success: () => void;
};
type CartContextType = [number, (count: number) => void];
type AuthContextType = {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
const { actions, reducer: cartReducer } = CartSlice;
const { setOrderFoodCount } = actions;
export const RequestContext = createContext<RequestContext>({} as never);
export const CartContext = createContext<CartContextType>({} as never);
export const AuthContext = createContext<AuthContextType>({} as never);

function App() {
  const { requestState, loading, success } = useRequestStatus();
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const handleCount = (count: number) => dispatch(setOrderFoodCount(count));

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      loading();
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log('No current user');
      }
    } catch (err) {
      console.log(err);
    } finally {
      success();
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }: { children: React.ReactElement }) => {
    if (requestState.status === REQUEST_STATE.OK) {
      // draft
      if (isSignedIn) {
        return <Navigate to="/signin" replace />;
      }

      return children;
    }
  };

  return (
    <>
      <RequestContext.Provider value={{ requestState, loading, success }}>
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
          {/* TODO: オブジェクトに変更する */}
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
                  <Route path="/orders" element={<Private children={<Orders />} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </CartContext.Provider>
        </AuthContext.Provider>
      </RequestContext.Provider>
    </>
  );
}

export default App;

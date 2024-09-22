import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './routes/login';
import Signup from './routes/signup';
import Home from './routes/home';
import Hotels,{loader as hotelLoader} from './routes/hotels';
import ErrorPage from './error';
import Cart,{loader as cartLoader} from './routes/cart';
import Profile from './routes/profile';
import Menu from './routes/menu';
import Address from './routes/address';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: `/signup`,
    element: <Signup/>,
  },
  {
    path: `/home`,
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/home/hotels`,
        element: <Hotels />,
        loader: hotelLoader
      },
      {
        path: `/home/cart`,
        element: <Cart />,
        loader: cartLoader
      },
      {
        path: `/home/profile`,
        element: <Profile />,
      },
      {
        path: `/home/menu`,
        element: <Menu />,
       
      },
      {
        path: `/home/profile/address`,
        element: <Address />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

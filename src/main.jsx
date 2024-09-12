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
import Hotels from './routes/hotels';
import ErrorPage from './error';
import Cart from './routes/cart';
import Profile from './routes/profile';

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
      },
      {
        path: `/home/cart`,
        element: <Cart />,
      },
      {
        path: `/home/profile`,
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

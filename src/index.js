import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import Session from './Session';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Home  from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/session",
    element: <Session/>,
  },
]);
ReactDOM.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Home  from './Home';
import Session from './Session';
import Profil from './Profil';
import "./i18n";
import Landing from './Landing';

const SuspenseLayout = () => (
  <React.Suspense fallback={<>...</>}>
    <Landing />
  </React.Suspense>
);
const router = createBrowserRouter([
  {
    path: "/",
    element:<SuspenseLayout/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/session",
    element: <Session/>,
  },
  {
    path: "/profil",
    element: <Profil/>,
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
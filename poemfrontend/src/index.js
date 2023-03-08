import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App, { loader as appLoader, standardLoader } from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Title } from './components/Greeting';
import { Base } from './components/Base';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Friends } from './components/pages/Friends';
import { Writer } from './components/pages/Writer';
import { Search } from './components/pages/Search';
import { EditProfile } from './components/pages/EditProfile';
import NotFoundPage  from './components/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
  },
  {
    path: "login",
    element: <Title component={ <Login /> }></Title> 
  },
  {
    path: "register",
    element: <Title component={ <Register /> }></Title>
  },
  {
    path: "friends",
    element: <Base component={ <Friends /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "write",
    element: <Base component={ <Writer /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "search",
    element: <Base component={ <Search /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "edit-profile",
    element: <Base component={ <EditProfile /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "*",
    element: <Base component= { <NotFoundPage />}></Base>,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

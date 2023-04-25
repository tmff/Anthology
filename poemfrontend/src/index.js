import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App, { loader as appLoader, standardLoader, loginLoader, poemLoader } from './js/Loaders';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Title } from './components/Greeting';
import { Base } from './components/Base';
import { ErrorPage } from './components/pages/ErrorPage';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Friends } from './components/pages/Friends';
import { Writer } from './components/pages/Writer';
import { Search } from './components/pages/Search';
import { EditProfile } from './components/pages/EditProfile';
import { GDPR } from './components/pages/GDPR';
import { TheReadingRoom } from './components/pages/TheReadingRoom';
import NotFoundPage  from './components/pages/NotFound';
import { UserProfile } from './components/pages/UserProfile';
import { Highlight } from './components/pages/Highlight';
import PoemDataViewer from './components/pages/PoemDataViewer';
import { Bookmarks } from './components/pages/Bookmarks';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
  },
  {
    path: "login",
    element: <Title component={ <Login /> }></Title>,
    errorElement: <Title component={ <ErrorPage /> }></Title>,
    loader: loginLoader,
  },
  {
    path: "register",
    element: <Title component={ <Register /> }></Title>,
    errorElement: <Title component={ <ErrorPage /> }></Title>,
    loader: loginLoader,
  },
  {
    path: "friends",
    element: <Base component={ <Friends /> }></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "reading-room",
    element: <Base component={ <TheReadingRoom /> }></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "write",
    element: <Base component={ <Writer /> }></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "search",
    element: <Base component={ <Search /> }></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "profile",
    element: <Base component={ <UserProfile/>}></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "edit-profile",
    element: <Base component={ <EditProfile /> }></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    // loader: standardLoader,
  },
  {
    path: "highlight",
    element:<Base component={ <Highlight />}></Base>,
    errorElement: <Base component={ <ErrorPage /> }></Base>,
    loader: standardLoader,
  },
  {
    path: "privacy",
    element: <Base component={ <GDPR />}></Base>,
  },
  {
    path: "/poem/:poemId",
    element: <Base component={ <PoemDataViewer /> }></Base>,
    loader: poemLoader,
  },
  {
    path: "/bookmarks",
    element: <Base component={ <Bookmarks /> }></Base>,
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homepage';
import SignIn from './pages/signin';
import SignUp from './pages/register';
import ErrorPage from './pages/errorpage'
import CollectionPage from './pages/collection';
import SearchPage from './pages/searchresultspage';

import App from './app';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/register',
        element: <SignUp />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/collection',
        element: <CollectionPage />
      },
      {
        path: '/search',
        element: <SearchPage/>
      }
    
  
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
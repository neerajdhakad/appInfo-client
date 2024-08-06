import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider,createBrowserRouter  } from 'react-router-dom'
// import Layout from './Layout.tsx'
import AddApplication from './pages/AddApplication.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import AppDetails from './pages/AppDetails.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addApplication",
    element: <AddApplication />,
  }, 
  {
    path: "/details/:id",
    element: <AppDetails />,
  }, 
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

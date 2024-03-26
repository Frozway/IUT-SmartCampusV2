import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import Header from './components/Header.jsx'
import './styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import DetailRoom from './components/DetailRoom.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/room/:tag",
        element: <DetailRoom />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

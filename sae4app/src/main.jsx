import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import RoomList from './components/RoomList.jsx'
import './styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import DetailRoom from './components/DetailRoom.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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

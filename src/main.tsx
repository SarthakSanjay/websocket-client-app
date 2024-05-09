import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChatWindow from './components/ChatWindow.tsx'
import MessageArea from './components/MessageArea.tsx'

const router = createBrowserRouter([
  {
    path:'',
    element:<App />,
    children:[
      {
        path:'/:connectionID',
        element:<ChatWindow />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

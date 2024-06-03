import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Register from './auth/Register.tsx'
import Login from './auth/Login.tsx'
import { Settings } from './components/Settings.tsx'
import ChatArea from './components/ChatArea.tsx'
import { RecoilRoot } from 'recoil'
import Account from './components/Account.tsx'
import FriendRequests from './components/FriendRequests.tsx'
import Chats from './components/Chats.tsx'


const router = createBrowserRouter([
  {
    path:'',
    element:<App />,
    children:[
      {
        path:'setting',
        element:<Settings />
      },
      {
        path:'home',
        element:<ChatArea />,
        children:[
          {
            path:'user/:id',
            element: <Chats />
          }
        ]
      },
      {
        path:'account',
        element:<Account />
      },
      {
        path:'notification',
        element:<FriendRequests />
      }
    ]
  },
  {
    path: 'register',
    element : <Register />
  },
  {
    path: 'login',
    element : <Login />
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
)

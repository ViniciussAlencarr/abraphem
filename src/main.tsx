import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'

import {
  ErrorPage,
  Home,
  FirstScreen,
  Login,
  RequestScreen,
  Screens,
  ReplyScreenSent,
  MyRequests,
  Faq,
  MyUser
} from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Navigate to="/"/>
      },
      {
        path: '/inicio',
        element: <Navigate to="/"/>
      },
    ]
  },
  {
    path: '/',
    element: <Screens />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/welcome',
        element: <FirstScreen />
      },
      {
        path: '/manifest/new',
        element: <RequestScreen />
      },
      {
        path: '/manifest/status/success',
        element: <ReplyScreenSent />
      },
      {
        path: '/manifest/status/error',
        element: <ReplyScreenSent />
      },
      {
        path: '/manifests',
        element: <MyRequests />
      },
      {
        path: '/faq',
        element: <Faq />
      },
      {
        path: '/account/user',
        element: <MyUser />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

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
        path: '/firstScreen',
        element: <FirstScreen />
      },
      {
        path: '/request/new',
        element: <RequestScreen />
      },
      {
        path: '/request/status/success',
        element: <ReplyScreenSent />
      },
      {
        path: '/request/status/error',
        element: <ReplyScreenSent />
      },
      {
        path: '/requests',
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

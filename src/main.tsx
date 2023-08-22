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
  Dashboard,
  Login,
  CreateManifest,
  Screens,
  ReplyScreenSent,
  Manifests,
  Faq,
  MyUser,
  AdminScreens,
  CompletedManifests,
  DashboardAdmin,
  LoginAdmin,
  OpenManifests,
  ProgressManifests,
  ExportData,
  RegisteredUsers
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
        element: <Dashboard />
      },
      {
        path: '/manifest/new',
        element: <CreateManifest />
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
        element: <Manifests />
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
  {
    path: '/',
    element: <AdminScreens />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/administrador/welcome',
        element: <DashboardAdmin />
      },
      {
        path: '/administrador/clients',
        element: <RegisteredUsers />
      },
      {
        path: '/administrador/manifests/complete',
        element: <CompletedManifests />
      },
      {
        path: '/administrador/manifests/in-progress',
        element: <ProgressManifests />
      },
      {
        path: '/administrador/manifests/open',
        element: <OpenManifests />
      },
      {
        path: '/administrador/export-data',
        element: <ExportData />
      },
    ]
  },
  {
    path: '/administrador/login',
    element: <LoginAdmin />
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router}/>
)

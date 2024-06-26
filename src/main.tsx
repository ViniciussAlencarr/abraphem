import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import {
  ErrorPage,
  Home,
  Dashboard,
  Login,
  CreateManifest,
  RecoveryPassword,
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
  RegisteredUsers,
  SendMailToRecoveryPassword,
  Signin,
  AdmMyUser
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
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/recovery-password',
        element: <SendMailToRecoveryPassword />
      },
      {
        path: '/recovery-password/change-password',
        element: <RecoveryPassword />
      },
    ]
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
      {
        path: '/administrador/account/user',
        element: <AdmMyUser />
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

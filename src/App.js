import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import AddCandy from './pages/AddCandy';
import CandiesPage from './pages/CandiesPage';
import { Suspense } from 'react';
import AuthProvider from './store/AuthProvider';
import Auth from './pages/Auth';
import PublicRoutes from './pages/PublicRoutes';
import ProtectedRoutes from './pages/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: '/auth',
            element: <Auth />,
          },
        ]
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/candies',
            element: <CandiesPage />,
          },
          {
            path: '/add-candy',
            element: <AddCandy />,
          }
        ]
      }
    ]
  },
])

function App() {

  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}/>
      </Suspense>
    </AuthProvider>
  );
}

export default App;

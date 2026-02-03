import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import AddCandy from './pages/AddCandy';
import CandiesPage from './pages/CandiesPage';
import { Suspense } from 'react';
import AuthProvider from './store/AuthProvider';
import Auth from './pages/Auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/candies',
        element: <CandiesPage />,
      },
      {
        path: '/add-candy',
        element: <AddCandy />,
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

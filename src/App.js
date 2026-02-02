import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import AddCandy from './pages/AddCandy';
import CandiesPage from './pages/CandiesPage';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
  },
])

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;

import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../../modules/common/layouts/AppLayout';
import Product from '../pages/product';
import Home from '../pages/home';

export default createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        path: '/product/:slug',
        element: <Product />,
      },
    ],
  },
  {
    path: '/login',
    element: <h1>Login asdsa</h1>,
  },
]);
